import { FieldOption } from "../services/mails/mails.model";


export const Columns = [
    {name: 'Selector', sort: false, type: 'radio'},
    {name: 'Nombre', sort: true, field: FieldOption.name, type: 'big'},
    {name: 'Company', sort: true, field: FieldOption.company, type: ''},
    {name: 'Lists', sort: false, type: ''},
    {name: 'Status', sort: false, type: ''},
    {name: 'Creado ...', sort: true, field: FieldOption.createAt, type: ''}
  ];
