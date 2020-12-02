import React from "react";
import { Field } from "formik";

export default function FormikCheckbox(props) {
  return (
    <Field name={props.name} className="col-sm">
      {({ field, form }) => (
        <label className=" col-sm form-check-label">
          <input
            type="checkbox"
            {...props}
            checked={field.value.includes(props.value)}
            onChange={() => {
              if (field.value.includes(props.value)) {
                const nextValue = field.value.filter(
                  (value) => value !== props.value
                );
                form.setFieldValue(props.name, nextValue);
              } else {
                const nextValue = field.value.concat(props.value);
                form.setFieldValue(props.name, nextValue);
              }
            }}
          />
          {props.amenity.name} {props.amenity.type}
        </label>
      )}
    </Field>
  );
}
