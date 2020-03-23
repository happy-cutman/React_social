import React from 'react';
import classes from './FormsControls.module.css'
import {Field} from 'redux-form';


const FormControl = ({input, meta, child, ...props}) => {
    const hasError = meta.touched && meta.error; // текст ошибки сидит в мета еррор
    return (
        <div className={classes.formControl + ' ' + (hasError ? classes.error : '')}>
            <div>
                {props.children} {/* textarea или инпут */}
            </div>
            { hasError && <span>{meta.error}</span> } {/* если в мета есть свойство еррор то показываем спан*/}
        </div>
    )
};


export const TextArea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}> <textarea {...input} {...restProps}/> </FormControl>
};


export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}> <input {...input} {...restProps}/> </FormControl> // input это child

};

export const createField = (placeholder, name, validators, component, props={}, text='') => {
    return <div>
        <Field placeholder={placeholder}
               name={name}
               validate={validators}
               component={component}
               {...props}/> {text}
    </div>
};



