import { useFormikContext } from 'formik';
import React from 'react';

import AppButton from './AppButton';

function SubmitButtonFormik({title}) {

    return (
        <AppButton title={title}  />
    );
}


export default SubmitButtonFormik;