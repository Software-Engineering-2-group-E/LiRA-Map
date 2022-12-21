//@Author(s) s164420

import { ActiveMeasProperties } from '../../../models/properties';

import PopupWrapper from './PopupWrapper';
import createPopup from '../../createPopup';


const useMeasPopup = () => {

	const [swal, popup] = createPopup<ActiveMeasProperties>();
	// const [options, setOptions] = useState<ActiveMeasProperties>()

	return (callback: (measurement: ActiveMeasProperties, shouldDelete: boolean) => void, editMode: boolean, defaultOptions: Required<ActiveMeasProperties>) => {

		// setOptions( defaultOptions )
		let options = { ...defaultOptions };

		popup({
			title: <p>Enter the name of your measurement and its tag<br />(ex: obd.rpm, acc.xyz)</p>,
			showCancelButton: true,
			cancelButtonColor: '#d33',
			confirmButtonText: editMode ? 'Update' : 'Add',
			showDenyButton: editMode,
			denyButtonText: 'Delete tag',
			html: <PopupWrapper
				defaultOptions={defaultOptions}
				setOptions={opts => {
					options = opts;
				}} />,
			preConfirm() {
				const nameInputElm = document.querySelector('#sweetalert-input') as HTMLInputElement
				const tagSelector = document.querySelector('#select-tag-dropdown-menu') as HTMLInputElement
				var errMsgArray : string[] = []
				if (!nameInputElm.value) {
					errMsgArray.push("provide a name for your tag")
				}
				if (tagSelector.outerText == "Tag..") {
					errMsgArray.push("select a tag")
				}
				var errMsg : string = "Please "
				var numErrs : number = 0
				if (errMsgArray.length == 1) {
					errMsg += errMsgArray.pop()
					numErrs += 1
				} else if (errMsgArray.length > 1) {
					errMsg += errMsgArray.pop()
					numErrs += 1
					for (var err of errMsgArray) {
						errMsg += " and "
						errMsg += err
						numErrs += 1
					}
					errMsg += "."
				}
				numErrs > 0 && (swal.showValidationMessage(errMsg)) 
			},
		})
			.then((result: any) => {
				if (result.isDenied) {
					callback(options, true);

				}

				if (!result.isConfirmed || options === undefined)
					return;

				callback(options, false);

				const addOrMod = editMode ? 'updated' : 'added'

				popup({
					title: <p>Measurement <b>{options.name}</b> {addOrMod}</p>,
					footer: `Will be drawn as ${options.rendererName}`,
					icon: 'success',
					timer: 1500,
					timerProgressBar: true,
					toast: true,
				});
			});

	};
};

export default useMeasPopup;

