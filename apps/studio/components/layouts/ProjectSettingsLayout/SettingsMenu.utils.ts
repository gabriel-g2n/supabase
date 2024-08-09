import type { ProductMenuGroup } from 'components/ui/ProductMenu/ProductMenu.types'
import type { Project } from 'data/projects/project-detail-query'
import { IS_PLATFORM, PROJECT_STATUS } from 'lib/constants'
import type { Organization } from 'types'

export const generateSettingsMenu = (
  ref?: string,
  project?: Project,
  organization?: Organization,
  features?: {
    auth?: boolean
    edgeFunctions?: boolean
    storage?: boolean
    invoices?: boolean
    warehouse?: boolean
    logDrains?: boolean
  }
): ProductMenuGroup[] => {
  const isProjectBuilding = project?.status === PROJECT_STATUS.COMING_UP
  const buildingUrl = `/project/${ref}`

  const authEnabled = features?.auth ?? true
  const edgeFunctionsEnabled = features?.edgeFunctions ?? true
  const storageEnabled = features?.storage ?? true
  const warehouseEnabled = features?.warehouse ?? false
  const logDrainsEnabled = features?.logDrains ?? false

  // If user is in self hosted mode, show log drains, otherwise show only if they are enabled
  const showLogDrains = IS_PLATFORM ? logDrainsEnabled : true

  return [
    ...(IS_PLATFORM
      ? [
          {
            title: 'Project Settings',
            items: [
              {
                name: 'General',
                key: 'general',
                url: `/project/${ref}/settings/general`,
                items: [],
              },
              {
                name: 'Infrastructure',
                key: 'infrastructure',
                url: isProjectBuilding ? buildingUrl : `/project/${ref}/settings/infrastructure`,
                items: [],
              },
              {
                name: 'Integrations',
                key: 'integrations',
                url: `/project/${ref}/settings/integrations`,
                items: [],
              },
              {
                name: 'Add Ons',
                key: 'addons',
                url: `/project/${ref}/settings/addons`,
                items: [],
              },
              {
                name: 'Vault',
                key: 'vault',
                url: isProjectBuilding ? buildingUrl : `/project/${ref}/settings/vault/secrets`,
                items: [],
                label: 'BETA',
              },
            ],
          },
        ]
      : []),
    {
      title: 'Configuration',
      items: [
        ...(IS_PLATFORM
          ? [
              {
                name: 'Database',
                key: 'database',
                url: isProjectBuilding ? buildingUrl : `/project/${ref}/settings/database`,
                items: [],
              },
              {
                name: 'API',
                key: 'api',
                url: isProjectBuilding ? buildingUrl : `/project/${ref}/settings/api`,
                items: [],
              },
            ]
          : []),
        ...(IS_PLATFORM && authEnabled
          ? [
              {
                name: 'Authentication',
                key: 'auth',
                url: isProjectBuilding ? buildingUrl : `/project/${ref}/settings/auth`,
                items: [],
              },
            ]
          : []),
        ...(IS_PLATFORM && storageEnabled
          ? [
              {
                name: 'Storage',
                key: 'storage',
                url: `/project/${ref}/settings/storage`,
                items: [],
              },
            ]
          : []),
        ...(IS_PLATFORM && edgeFunctionsEnabled
          ? [
              {
                name: 'Edge Functions',
                key: 'functions',
                url: `/project/${ref}/settings/functions`,
                items: [],
              },
            ]
          : []),
        ...(IS_PLATFORM && warehouseEnabled
          ? [
              {
                name: 'Warehouse',
                key: 'warehouse',
                url: `/project/${ref}/settings/warehouse`,
                items: [],
              },
            ]
          : []),
        ...(showLogDrains
          ? [
              {
                name: `Log Drains`,
                key: `log-drains`,
                url: `/project/${ref}/settings/log-drains`,
                items: [],
              },
            ]
          : []),
      ],
    },

    ...(IS_PLATFORM
      ? [
          {
            title: 'Billing',
            items: [
              {
                name: 'Subscription',
                key: 'subscription',
                url: `/org/${organization?.slug}/billing`,
                items: [],
              },

              {
                name: 'Usage',
                key: 'usage',
                url: `/org/${organization?.slug}/usage?projectRef=${ref}`,
                items: [],
              },
            ],
          },
        ]
      : []),
  ]
}
