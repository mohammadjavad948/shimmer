import { useTransition, a } from '@react-spring/web';
import { Field, FieldProps } from 'formik';
import { useEffect, useState } from 'react';
import {
  AiOutlinePlus,
  AiFillDelete,
  AiOutlineCaretDown,
  AiOutlineCaretUp,
  AiFillCheckCircle,
} from 'react-icons/ai';
import useMeasure from 'react-use-measure';

export function AnswerForm(props: { name: string }) {
  return (
    <Field name={props.name}>
      {(data: FieldProps) => <Answers data={data} name={props.name} />}
    </Field>
  );
}

interface Data {
  h: number;
  is_answer: boolean;
  data: string;
}

function Answers(props: { data: FieldProps; name: string }) {
  let data: Data[] = props.data.field.value;

  const transition = useTransition(data, {
    from: (_item, index) => {
      let allHeight = data
        .filter((_, i) => i < index)
        .map(x => x.h)
        .reduce((x, n) => x + n, 8);

      return {
        top: allHeight - 8,
        opacity: 0,
      };
    },
    enter: (_item, index) => {
      let allHeight = data
        .filter((_, i) => i < index)
        .map(x => x.h)
        .reduce((x, n) => x + n + 8, 8);

      return {
        top: allHeight,
        opacity: 1,
      };
    },
    leave: (_item, index) => {
      let allHeight = data
        .filter((_, i) => i < index)
        .map(x => x.h)
        .reduce((x, n) => x + n, 8);

      return {
        top: allHeight - 8,
        opacity: 0,
      };
    },
    update: (_item, index) => {
      let allHeight = data
        .filter((_, i) => i < index)
        .map(x => x.h)
        .reduce((x, n) => x + n + 8, 8);

      return {
        top: allHeight,
        opacity: 1,
      };
    },
  });

  function elResize(h: number, index: number) {
    props.data.form.setFieldValue(
      props.name,
      data.map((e, i) => {
        if (i == index) {
          e.h = h;
        }

        return e;
      })
    );
  }

  function newData() {
    props.data.form.setFieldValue(props.name, [
      ...data,
      { data: 'question', h: 0, is_answer: false },
    ]);
  }

  function remove(index: number) {
    props.data.form.setFieldValue(
      props.name,
      data.filter((_el, i) => i != index)
    );
  }

  function swap(index: number, sIndex: number) {
    let copy = [...data];

    var b = copy[index];
    copy[index] = copy[sIndex];
    copy[sIndex] = b;

    props.data.form.setFieldValue(props.name, copy);
  }

  function change(index: number, value: any) {
    let copy = [...data];

    copy[index].data = value;

    props.data.form.setFieldValue(props.name, copy);
  }

  function markAsAnswer(index: number) {
    props.data.form.setFieldValue(
      props.name,
      data.map((el, i) => {
        let copy = el;

        if (copy.is_answer) {
          copy.is_answer = false;
        }

        if (i == index) {
          copy.is_answer = true;
        }

        return copy;
      })
    );
  }

  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">Answers</span>

        <span
          onClick={newData}
          className="cursor-pointer rounded-lg bg-slate-300 px-2 py-2 font-bold text-slate-800"
        >
          <AiOutlinePlus size={18} />
        </span>
      </div>

      <div
        className="relative flex w-full flex-col"
        style={{
          height: data.map(x => x.h).reduce((x, n) => x + n + 8, 0),
        }}
      >
        {transition((style, item, _, index) => (
          <Quest
            count={data.length}
            style={style}
            swap={swap}
            answer={markAsAnswer}
            item={item}
            change={change}
            remove={remove}
            resize={elResize}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

function Quest(props: {
  style: any;
  item: Data;
  count: number;
  resize: any;
  remove: any;
  answer: any;
  swap: any;
  change: any;
  index: number;
}) {
  const [ref, bounds] = useMeasure();

  useEffect(() => {
    props.resize(bounds.height, props.index);
  }, [bounds.height]);

  return (
    <a.div
      ref={ref}
      style={props.style}
      className="absolute z-30 flex w-full gap-2 rounded-md bg-white p-3"
    >
      <div className="flex w-6 flex-col gap-1">
        {props.index != 0 && (
          <span
            className="cursor-pointer rounded-sm bg-slate-300 p-1 text-slate-800"
            onClick={() => props.swap(props.index, props.index - 1)}
          >
            <AiOutlineCaretUp size={15} />
          </span>
        )}
        <span
          className="cursor-pointer rounded-sm bg-slate-300 p-1 text-slate-800"
          onClick={() => props.remove(props.index)}
        >
          <AiFillDelete size={15} />
        </span>
        {props.count - 1 != props.index && (
          <span
            className="cursor-pointer rounded-sm bg-slate-300 p-1 text-slate-800"
            onClick={() => props.swap(props.index, props.index + 1)}
          >
            <AiOutlineCaretDown size={15} />
          </span>
        )}
        <span
          className={`cursor-pointer rounded-sm bg-slate-300 p-1 text-slate-800 ${
            props.item.is_answer && 'bg-green-200 text-green-900'
          }`}
          onClick={() => props.answer(props.index)}
        >
          <AiFillCheckCircle size={15} />
        </span>
      </div>

      <div className="flex flex-1">
        <textarea
          value={props.item.data}
          rows={2}
          onChange={e => props.change(props.index, e.target.value)}
          className="h-full w-full rounded-lg border-0 ring-0"
        />
      </div>
    </a.div>
  );
}
