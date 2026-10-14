'use client';
import { useRef, useState } from 'react';
import { fileToItem } from '@/lib/images';
import { TrashIcon, UploadIcon } from './Icons';

// Carga de fotos con selección múltiple y eliminado múltiple.
// value: [{ id, url, file? }]   onChange(items)
// La primera foto es la portada.
export default function PhotoUploader({ value, onChange, max = 20 }) {
  const inputRef = useRef(null);
  const [selected, setSelected] = useState([]);
  const [dragging, setDragging] = useState(false);

  const addFiles = (fileList) => {
    const files = [...fileList].filter((f) => f.type.startsWith('image/'));
    onChange([...value, ...files.map(fileToItem)].slice(0, max));
  };

  const toggle = (id) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const allSelected = value.length > 0 && selected.length === value.length;

  const removeSelected = () => {
    onChange(value.filter((item) => !selected.includes(item.id)));
    setSelected([]);
  };

  const makeCover = (id) => {
    const item = value.find((x) => x.id === id);
    onChange([item, ...value.filter((x) => x.id !== id)]);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition ${
          dragging ? 'border-brand bg-brand/10' : 'border-line hover:border-brand/60'
        }`}
      >
        <UploadIcon />
        <span className="text-sm">Tocá para elegir fotos o arrastralas acá</span>
        <span className="text-xs text-muted">Podés seleccionar varias a la vez (máximo {max})</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = '';
        }}
      />

      {value.length > 0 && (
        <>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs">
            <label className="flex cursor-pointer items-center gap-2 text-muted">
              <input
                type="checkbox"
                className="size-4 accent-brand"
                checked={allSelected}
                onChange={() => setSelected(allSelected ? [] : value.map((x) => x.id))}
              />
              Seleccionar todas ({value.length})
            </label>
            <button
              type="button"
              disabled={!selected.length}
              onClick={removeSelected}
              className="btn btn-sm border border-brand text-brand hover:bg-brand hover:text-white"
            >
              <TrashIcon /> Eliminar seleccionadas ({selected.length})
            </button>
          </div>

          <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
            {value.map((item, i) => {
              const isSel = selected.includes(item.id);
              return (
                <li
                  key={item.id}
                  className={`group relative aspect-square overflow-hidden rounded-lg border-2 ${
                    isSel ? 'border-brand' : 'border-transparent'
                  }`}
                >
                  <img
                    src={item.url}
                    alt={`Foto ${i + 1}`}
                    onClick={() => toggle(item.id)}
                    className={`size-full cursor-pointer object-cover ${isSel ? 'opacity-60' : ''}`}
                  />
                  <input
                    type="checkbox"
                    aria-label={`Seleccionar foto ${i + 1}`}
                    checked={isSel}
                    onChange={() => toggle(item.id)}
                    className="absolute top-1.5 left-1.5 size-5 accent-brand"
                  />
                  {i === 0 ? (
                    <span className="absolute bottom-1 left-1 rounded bg-brand px-1.5 py-0.5 text-[10px] font-medium">
                      Portada
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => makeCover(item.id)}
                      className="absolute bottom-1 left-1 cursor-pointer rounded bg-black/70 px-1.5 py-0.5 text-[10px] opacity-0 group-hover:opacity-100 focus:opacity-100"
                    >
                      Usar de portada
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
