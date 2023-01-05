import { Field, FieldProps } from "formik";
import { AiOutlinePlus } from 'react-icons/ai';


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
            <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">
                    Answers
                </span>

                <button className="px-2 py-2 rounded-lg font-bold bg-slate-300">
                    <AiOutlinePlus size={18} />
                </button>
            </div>
        </div>
    )
}