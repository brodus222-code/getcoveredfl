import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets } from 'base44:runtime';

const MAX_AGE = 64;

function pick(obj, keys) {
  for (const k of keys) {
    const hit = Object.keys(obj).find((f) => f.toLowerCase().replace(/[^a-z0-9]/g, '') === k);
    if (hit && obj[hit] !== undefined && obj[hit] !== null && String(obj[hit]).trim() !== '') {
      return String(obj[hit]).trim();
    }
  }
  return '';
}

function flatten(body) {
  // Meta / Zapier / Make all send flat-ish objects, but Meta's raw format uses
  // field_data: [{ name, values: [] }]
  const flat = {};
  for (const [k, v] of Object.entries(body || {})) {
    if (typeof v !== 'object' || v === null) flat[k] = v;
  }
  const fieldData = body?.field_data || body?.entry?.[0]?.changes?.[0]?.value?.field_data;
  if (Array.isArray(fieldData)) {
    for (const f of fieldData) {
      if (f?.name) flat[f.name] = Array.isArray(f.values) ? f.values[0] : f.value;
    }
  }
  return flat;
}

function parseBirthYear(raw) {
  if (!raw) return null;
  const yearMatch = String(raw).match(/(19|20)\d{2}/);
  if (yearMatch) return parseInt(yearMatch[0], 10);
  const age = parseInt(String(raw).replace(/\D/g, ''), 10);
  if (age >= 18 && age <= 120) return new Date().getFullYear() - age;
  return null;
}

export default async function (req: Request): Promise<Response> {
  try {
    const url = new URL(req.url);
    const provided = req.headers.get('x-webhook-secret') || '';
    if (provided !== secrets.get('META_LEAD_WEBHOOK_SECRET')) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Meta webhook subscription verification handshake
    if (req.method === 'GET') {
      const challenge = url.searchParams.get('hub.challenge');
      if (challenge) return new Response(challenge, { status: 200 });
      return Response.json({ ok: true });
    }

    const body = await req.json();
    const f = flatten(body);

    const fullName =
      pick(f, ['fullname', 'name']) ||
      [pick(f, ['firstname']), pick(f, ['lastname'])].filter(Boolean).join(' ');
    const email = pick(f, ['email', 'emailaddress']);
    const phone = pick(f, ['phone', 'phonenumber', 'mobilenumber']);
    const zip = pick(f, ['zipcode', 'zip', 'postalcode']).replace(/\D/g, '').slice(0, 5);

    if (!fullName || !email || !phone || !zip) {
      return Response.json(
        { error: 'Missing required fields', received: Object.keys(f), parsed: { fullName, email, phone, zip } },
        { status: 400 }
      );
    }

    const birthYear = parseBirthYear(pick(f, ['birthyear', 'yearofbirth', 'dateofbirth', 'dob', 'age']));
    const age = birthYear ? new Date().getFullYear() - birthYear : null;
    const unqualified = age !== null && age > MAX_AGE;

    const base44 = createClientFromRequest(req);
    const lead = await base44.asServiceRole.entities.Lead.create({
      full_name: fullName,
      email,
      phone,
      zip_code: zip,
      birth_year: birthYear || undefined,
      lead_source: 'meta_instant_form',
      qualified: !unqualified,
      disqualified_reason: unqualified ? `Age ${age} — Medicare eligible, not ACA marketplace` : undefined,
      status: unqualified ? 'closed' : 'new',
      // Suppress the branded confirmation email for unqualified leads
      confirmation_email_sent: unqualified ? true : false,
      notes: unqualified
        ? 'Meta Instant Form lead — auto-marked unqualified (65+). Not routed to an agent.'
        : 'Meta Instant Form lead.',
    });

    return Response.json({ ok: true, lead_id: lead.id, qualified: !unqualified });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}