import {ErrorMessage, Field, Form, Formik} from "formik";
import React from 'react'
import {FilterType} from "../../../Redux/users-reducer";


const UsersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
type FormType = {
    term: string
    friend: 'true' | 'false' | 'null'
}

const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
    const submit = (values: FormType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'true' ? true : values.friend === 'false' ? false : null
        }
        props.onFilterChanged(filter)
        setSubmitting(false)
    }
    return (
        <div>
            <Formik
                initialValues={{term: '', friend: 'null'}}
                validate={UsersSearchFormValidate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field name="term"/>
                        <Field as="select" name="friend">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})

export default UsersSearchForm