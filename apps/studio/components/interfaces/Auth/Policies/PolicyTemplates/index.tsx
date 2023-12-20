import { isEmpty } from 'lodash'
import { useState } from 'react'
import { Button } from 'ui'

import { PolicyTemplate } from './PolicyTemplates.constants'
import TemplatePreview from './TemplatePreview'
import TemplatesList from './TemplatesList'

interface PolicyTemplatesProps {
  templates?: PolicyTemplate[]
  templatesNote?: string
  onUseTemplate?: (template: PolicyTemplate) => void
}

const PolicyTemplates = ({
  templates = [],
  templatesNote = '',
  onUseTemplate = () => undefined,
}: PolicyTemplatesProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<PolicyTemplate>(templates[0])
  return (
    <div>
      <div className="flex justify-between border-t border-default">
        <TemplatesList
          templatesNote={templatesNote}
          templates={templates}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />
        <TemplatePreview selectedTemplate={selectedTemplate} />
      </div>
      <div className="flex w-full items-center justify-end gap-3 border-t px-6 py-4 border-default">
        <span className="text-sm text-foreground-lighter">
          This will override any existing code you've written
        </span>
        <Button
          type="primary"
          disabled={isEmpty(selectedTemplate)}
          onClick={() => onUseTemplate(selectedTemplate)}
        >
          Use this template
        </Button>
      </div>
    </div>
  )
}

export default PolicyTemplates
