import { useRef, useState } from 'react';
import { ArrowDown, ArrowUp, GripVertical } from 'lucide-react';
import type { Attachment, PhotoLayout } from './types';
import { mediaUrl } from './helpers';
import { aspect, clampLayout, photoLayouts, photoPageHeight, CAPTION_HEIGHT } from '../electron/layout.mjs';

export default function PhotoLayoutEditor({ photos, onChange, bounds = {width:170,height:215} }: { photos: Attachment[]; onChange: (photos: Attachment[]) => void; bounds?:{width:number;height:number} }) {
  const positions = photoLayouts(photos,bounds);
  const pages = [...new Set(positions.map(p => p.page))].sort((a, b) => a - b);
  const [selected, setSelected] = useState('');
  const gesture = useRef<{ id: string; x: number; y: number; scale: number; resizing: boolean; layout: PhotoLayout } | null>(null);
  const nextPage = Math.min(499, Math.max(...pages) + 1);

  function update(id: string, layout: PhotoLayout) {
    // Freeze other photos at their displayed positions when moving between pages.
    onChange(photos.map((photo, i) => ({ ...photo, layout: photo.id === id ? clampLayout(photo, layout,bounds) : positions[i] })));
  }
  function reorder(id: string, direction: number) {
    const index = photos.findIndex(photo => photo.id === id), destination = index + direction;
    if (destination < 0 || destination >= photos.length) return;
    const arranged: Attachment[] = photos.map((photo, i) => ({ ...photo, layout: positions[i] }));
    arranged[index] = { ...photos[destination], layout: clampLayout(photos[destination], positions[index],bounds) };
    arranged[destination] = { ...photos[index], layout: clampLayout(photos[index], positions[destination],bounds) };
    onChange(arranged);
  }
  return <div className="photo-layout-editor">
    {pages.map(page => {const usedHeight=photoPageHeight(positions,page);return <div className="photo-board-page" key={page}>
      {pages.length>1 && <div className="photo-board-label">Fotoseite {page + 1}</div>}
      <div className="photo-board" style={{ aspectRatio: `${bounds.width} / ${usedHeight}` }}>
        {photos.map((photo, i) => {
          const pos = positions[i];
          if (pos.page !== page) return null;
          return <figure key={photo.id} className={`movable-photo ${selected === photo.id ? 'selected' : ''}`}
            style={{ left: `${pos.x / bounds.width * 100}%`, top: `${pos.y / usedHeight * 100}%`, width: `${pos.width / bounds.width * 100}%` }}
            tabIndex={0} aria-label={`Foto anordnen: ${photo.name}`} onFocus={event => { if (event.target === event.currentTarget) setSelected(photo.id); }}
            onPointerDown={event => {
              if (event.button !== 0 || (event.target as HTMLElement).closest('.photo-page-control,.photo-inline-tools')) return;
              event.preventDefault(); event.stopPropagation(); event.currentTarget.focus({ preventScroll: true }); setSelected(photo.id);
              const rect = event.currentTarget.closest('.photo-board')!.getBoundingClientRect();
              gesture.current = { id: photo.id, x: event.clientX, y: event.clientY, scale: rect.width / bounds.width, resizing: (event.target as HTMLElement).closest('[data-resize]') !== null, layout: pos };
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={event => {
              const g = gesture.current;
              if (!g || g.id !== photo.id) return;
              const dx = (event.clientX - g.x) / g.scale, dy = (event.clientY - g.y) / g.scale;
              update(photo.id, g.resizing ? { ...g.layout, width: g.layout.width + dx } : { ...g.layout, x: g.layout.x + dx, y: g.layout.y + dy });
            }}
            onPointerUp={() => { gesture.current = null; }} onLostPointerCapture={() => { gesture.current = null; }}
            onKeyDown={event => {
              if (event.target !== event.currentTarget) return;
              const delta = ({ ArrowLeft: [-2, 0], ArrowRight: [2, 0], ArrowUp: [0, -2], ArrowDown: [0, 2] } as Record<string, number[]>)[event.key];
              if (delta) { event.preventDefault(); update(photo.id, { ...pos, x: pos.x + delta[0], y: pos.y + delta[1] }); }
            }}>
            <img draggable={false} src={mediaUrl(photo.id)} alt={photo.caption || photo.name} style={{ aspectRatio: String(1 / aspect(photo)) }} />
            <figcaption title={photo.caption || photo.name} style={{ maxHeight: `${CAPTION_HEIGHT / pos.width * 100}cqw` }}>{photo.caption || photo.name}</figcaption>
            <span className="photo-drag-label"><GripVertical size={13} />{i + 1}</span>
            <label className="photo-page-control"><span>Seite</span><select aria-label={`Fotoseite für ${photo.name}`} value={pos.page}
              onChange={event => update(photo.id, { ...pos, page: Number(event.target.value) })}>
              {Array.from({ length: Math.max(...pages) + 1 }, (_, number) => <option key={number} value={number}>{number + 1}</option>)}
              {!pages.includes(nextPage) && <option value={nextPage}>+ Neue Seite</option>}
            </select></label>
            {selected === photo.id && <div className="photo-inline-tools">
              <button className="icon-button" title="Foto nach vorne" disabled={i === 0} onClick={() => reorder(photo.id, -1)}><ArrowUp size={14} /></button>
              <button className="icon-button" title="Foto nach hinten" disabled={i === photos.length - 1} onClick={() => reorder(photo.id, 1)}><ArrowDown size={14} /></button>
              <label>Breite<input aria-label="Fotobreite in mm" type="number" min={1} max={bounds.width} step={1} value={Math.round(pos.width * 10) / 10}
                onChange={event => { const value = Number(event.target.value); if (value > 0 && value <= bounds.width) update(photo.id, { ...pos, width: value }); }} />mm</label>
            </div>}
            <button className="photo-resize-handle" data-resize title="Foto proportional skalieren" aria-label={`Foto skalieren: ${photo.name}`} />
          </figure>;
        })}
      </div>
    </div>;})}
  </div>;
}
