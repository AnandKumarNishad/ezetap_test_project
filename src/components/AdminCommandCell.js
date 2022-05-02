import * as React from "react";
export const AdminCommandCell = props => {
    const acceptBtn = {
        backgroundColor:"green", color:"white"
    }

    const { dataItem } = props;

    const inEdit = dataItem[props.editField];
    const isNewItem = dataItem.ProductID === undefined;
    return inEdit ? 
        <td className="k-command-cell">
            <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command" onClick={() => isNewItem ? props.add(dataItem) : props.update(dataItem)}>
                {isNewItem ? "Add" : "Update"}
            </button>
            <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-cancel-command" onClick={() => isNewItem ? props.discard(dataItem) : props.cancel(dataItem)}>
                {isNewItem ? "Discard" : "Cancel"}
            </button>
        </td> 
        : 
        <td className="k-command-cell">
            <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-green k-grid-edit-command" onClick={() => props.edit(dataItem)} style={acceptBtn}>
                Edit
            </button>
            <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-red k-grid-remove-command" onClick={() => props.delete(dataItem)} style={{backgroundColor:"#B23F27", color:"white"}}>
                Delete
            </button>
        </td>;
};