import React from 'react'
import styles from './FormsControls.module.css'
import {WrappedFieldProps} from "redux-form";

export const Element = (Element: string | React.FC): React.FC<WrappedFieldProps> => ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;

    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <div>
                <Element {...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}