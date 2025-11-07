'use client'

import { SupportBox } from '@/registry/gammaui/support-box'
import {
  IconMessageCircle,
  IconBook,
  IconBug,
  IconBulb,
} from '@tabler/icons-react'

export default function SupportBoxDemo() {
  const helpItems = [
    {
      title: 'Contact Support',
      description: 'Chat with our support team for assistance.',
      icon: <IconMessageCircle size={22} stroke={1.5} />,
      onPress: () => alert('Opening support chat...'),
    },
    {
      title: 'Documentation',
      description: 'Browse our guides and API documentation.',
      icon: <IconBook size={22} stroke={1.5} />,
      onPress: () => alert('Opening documentation...'),
    },
    {
      title: 'Report a Bug',
      description: 'Found an issue? Let us know!',
      icon: <IconBug size={22} stroke={1.5} />,
      onPress: () => alert('Redirecting to bug report form...'),
    },
    {
      title: 'Request a Feature',
      description: 'Suggest improvements or new features.',
      icon: <IconBulb size={22} stroke={1.5} />,
      onPress: () => alert('Opening feature request page...'),
    },
  ]

  return (
    <div className="flex items-center justify-center p-6">
      <SupportBox title="Need Help?" items={helpItems} />
    </div>
  )
}
