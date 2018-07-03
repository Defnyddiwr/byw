import { types, updateFormAction } from "../actions";

import { validatedForm, hasErrors } from "../../model/form";

const validate = function (store) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            const form = store.getState().form;
            const vForm = validatedForm(form);
            resolve(vForm);
        }, 10);
        
    });
};

const handle = function (dispatch) {
    return function (processedForm) {
        if (hasErrors(processedForm)) {
            dispatch(updateFormAction(processedForm));
            return;
        } 

        console.log("Submit:", processedForm);

    };
};

export default function makeSubmitMiddleware(api) {
    return store => next => action => {

        switch (action.type) {

        case types.submitForm:
            validate(store)
                .then(handle(store.dispatch, api));
            break;

        }

        return next(action);
    };
}