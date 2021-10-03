import { Formik } from 'formik';
import React from 'react';


function FormikForm({initialValues, validationSchema, children, onSubmit}) {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {()=>(
                <>
                {children}
                </>
            )}
        </Formik>

    );
}


export default FormikForm;