import { NeoSelectComponent } from "./select.component";
import { NeoOption } from "./select.types";


export class ItemsList {
    
    
    get selectedItems(): NeoOption[] { return []; }


    constructor(
        private _ngSelect: NeoSelectComponent
        // private _selectionModel: SelectionModel)
    ) { }

}
