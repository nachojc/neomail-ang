import { FieldOption } from '@neo/common';



export const Columns = [
    {name: 'Selector', sort: false, type: 'radio'},
    {name: 'Nombre', sort: true, field: FieldOption.name, type: 'big'},
    {name: 'Descripción', sort: false, field: FieldOption.decription, type: ''},
    {name: 'Suscritos', sort: false, type: ''},
    {name: 'No confirmados', sort: false, type: ''},
    {name: 'Creado ...', sort: true, field: FieldOption.createAt, type: ''}
  ];
