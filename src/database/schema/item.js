const itemSchema = {
  title: 'item schema',
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    createdAt: {
      type: 'string',
      index: true,
    },
    code: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    group: { type: 'string' },
    hsn: { type: 'string' },
    units: { type: 'string', default: 'pieces' }, // pieces, kg, liter
    price: { type: 'number', default: 0 },
    hsnCode: { type: 'string' },
    sgst: { type: 'number', default: 0 },
    cgst: { type: 'number', default: 0 },
    igst: { type: 'number', default: 0 },
  },
};

export default itemSchema;
