import { Field, FieldProps } from "formik";

export function AnswerForm(props: {name: string}){

    return (
        <Field
            name={props.name}
        >
            {(data: FieldProps) => (
                <Answers data={data} />
            )}
        </Field>
    )
}

function Answers(props: {data: FieldProps}){

    return (
        <div className="w-full flex flex-col">
            <div className="flex justify-between">
                <span className="text-sm text-slate-500">
                    Answers
                </span>

                <button className="px-3 py-1 rounded-lg font-bold bg-slate-300">
                    +
                </button>
            </div>
        </div>
    )
}