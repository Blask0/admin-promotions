import React from 'react'

return [
  {
    type: 'custom',
    subject: {
      label: 'Custom (one object)',
      value: 'custom-one-object',
    },
    verbs: toBeOrNotToBe,
    objects: {
      default: [this.generateInput('empty', 0)],
    },
  },
  {
    type: 'custom',
    subject: {
      label: 'Custom (two objects)',
      value: 'custom-two-objects',
    },
    verbs: toBeOrNotToBe,
    objects: {
      default: [
        this.generateInput('empty', 0),
        <div key="conjunction">and</div>,
        this.generateInput('empty', 1),
      ],
    },
  },
  {
    type: 'custom',
    subject: {
      label: 'Dropdown',
      value: 'dropdown',
    },
    verbs: toBeOrNotToBe,
    objects: {
      default: [
        <Statement.Dropdown
          key="dropdpown-1"
          onChange={(e, value) =>
            this.handleChangeStatement('empty', value, 'objects', 0)
          }
        />,
      ],
      double: [
        <Statement.Dropdown
          key="dropdpown-0"
          onChange={(e, value) =>
            this.handleChangeStatement('empty', value, 'objects', 0)
          }
        />,
        <div key="and">and</div>,
        <Statement.Dropdown
          key="dropdpown-1"
          onChange={(e, value) =>
            this.handleChangeStatement('empty', value, 'objects', 1)
          }
        />,
      ],
    },
  },
]
