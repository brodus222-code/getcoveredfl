import { Calendar, Clock, Lightbulb, Sparkles, Newspaper } from 'lucide-react';

export const categoryConfig = {
  open_enrollment: {
    label: 'Open Enrollment',
    icon: Calendar,
    badge: 'bg-primary-soft text-primary',
    gradient: 'from-primary to-primary-deep',
  },
  new_options: {
    label: 'New Options',
    icon: Sparkles,
    badge: 'bg-accent-soft text-accent-deep',
    gradient: 'from-accent to-accent-deep',
  },
  deadlines: {
    label: 'Deadlines',
    icon: Clock,
    badge: 'bg-orange-100 text-orange-700',
    gradient: 'from-orange-400 to-red-500',
  },
  tips: {
    label: 'Tips & Guides',
    icon: Lightbulb,
    badge: 'bg-turquoise-soft text-turquoise',
    gradient: 'from-turquoise to-primary',
  },
  general: {
    label: 'General',
    icon: Newspaper,
    badge: 'bg-slate-100 text-slate-700',
    gradient: 'from-slate-400 to-slate-600',
  },
};

export const categories = ['all', 'open_enrollment', 'new_options', 'deadlines', 'tips', 'general'];