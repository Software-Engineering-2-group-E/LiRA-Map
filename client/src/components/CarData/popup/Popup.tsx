
import { SegTypes } from "../../../pages/CarData";
import usePopup from "../../createPopup";
import FilterPopup from "./TypesPopup";


const useTypesPopup = (types: SegTypes) => {

    // const popup = usePopup(types)

    // return { fire: ( callback: (opt: SegTypes) => void ) => {

    //     popup.fire( {
    //         titleText: 'Please choose the filters you wish to use',
    //         showCancelButton: true,
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Add',
    //         html: <FilterPopup types={popup.state} setTypes={popup.setState}/>,
    //     } )
    //     .then( (result: any) => {
    //         console.log(result, popup.state);
    //         result.isConfirmed && callback(popup.state)
    //     } )

    // } }
}

export default useTypesPopup;

