import { useTransition, a } from '@react-spring/web';
import { Field, FieldProps } from 'formik';
import { useEffect, useState } from 'react';
import {
  AiOutlinePlus,
  AiFillDelete,
  AiOutlineCaretDown,
  AiOutlineCaretUp,
} from 'react-icons/ai';
import useMeasure from 'react-use-measure';

export function AnswerForm(props: { name: string }) {
  return (
    <Field name={props.name}>
      {(data: FieldProps) => <Answers data={data} />}
    </Field>
  );
}

interface Data {
  h: number;
  data: string;
}

function Answers(props: { data: FieldProps }) {
  const [data, setData] = useState<Data[]>([]);

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
    setData(el => {
      return el.map((e, i) => {
        if (i == index) {
          e.h = h;
        }

        return e;
      });
    });
  }

  function newData() {
    setData(d => {
      return [...d, { data: 'quest', h: 0 }];
    });
  }

  function remove(index: number) {
    setData(d => {
      return d.filter((_el, i) => i != index);
    });
  }

  function swap(index: number, sIndex: number) {
    setData(d => {
      let copy = [...d];

      var b = copy[index];
      copy[index] = copy[sIndex];
      copy[sIndex] = b;

      return copy;
    });
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
            item={item}
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
  swap: any;
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
      <div className="flex w-6 flex-col gap-2">
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
      </div>

      <div className="flex flex-1">
        <textarea
          value={props.item.data}
          rows={2}
          className="h-full w-full rounded-lg border-0 ring-0"
        />
      </div>
    </a.div>
  );
}
