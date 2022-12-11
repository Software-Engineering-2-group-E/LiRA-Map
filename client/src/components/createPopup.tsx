import { useState } from 'react';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import '@sweetalert2/theme-dark';

const swal = withReactContent(Swal)

const createPopup = <T,>() => {
    return [ 
        swal, 
        ( options: SweetAlertOptions<any, any> ): Promise<SweetAlertResult<T>> => 
        {
            return swal.fire({ 
                ...options, 
                customClass: { 
                    popup: 'sweetalert-popup', 
                    title: 'sweetalert-title'
                } 
            })
        } 
    ] as const
}

export default createPopup
