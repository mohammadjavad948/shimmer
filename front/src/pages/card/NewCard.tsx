import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { createCard } from '../../api/card';
import { allCardGroup } from '../../api/card_group';
import { AnswerForm } from '../../components/form/Answers';
import { MainLayout } from '../../layout/main';

export function NewCard() {
  const navigate = useNavigate();
  const query = useQueryClient();
  const { data } = useQuery(['card-group'], allCardGroup);

  async function submit(val: any) {
    val.answers = val.answers.map((el: any, index: any) => {
      if(el.is_answer){
        val.real_answer = {index};
      }

      return el.data;
    });
    
    await createCard(val);
    await query.invalidateQueries(['card']);

    navigate('/card');
  }

  return (
    <MainLayout>
      <div className="mb-2 flex w-full gap-2">
        <span className="text-base font-semibold text-slate-500">Cards</span>

        <span className="font-bold text-slate-500">&gt;</span>

        <span className="text-base font-semibold text-slate-700">New</span>
      </div>
      <Formik
        initialValues={{
          question: '',
          answers: [],
          group_id: null,
        }}
        onSubmit={submit}
      >
        <Form className="grid w-full grid-cols-1 flex-col gap-3 lg:grid-cols-2">
          <div className="flex w-full flex-col">
            <span className="mt-2 text-sm text-slate-500">Question</span>

            <Field
              name="question"
              as="textarea"
              rows="5"
              cols="50"
              className="mt-4 rounded-lg border border-slate-300 ring-0"
            />

            <span className="mt-4 text-sm text-slate-500">Card Group</span>

            <Field as="select" name="group_id" className="mt-2 w-full rounded-lg border border-gray-300 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-blue-500 focus:ring-blue-500">
              <option selected>Choose a Group</option>
              {data?.data?.map((el, index) => {
                return (
                  <option value={el.id} key={index}>{el.name}</option>
                )
              })}
            </Field>

            <button
              type="submit"
              className="mt-3 rounded-lg bg-slate-400 px-1 py-2 font-semibold text-slate-800"
            >
              Save
            </button>
          </div>

          <AnswerForm name="answers" />
        </Form>
      </Formik>
    </MainLayout>
  );
}
