import { useEffect, useState } from "react";
import api, { getErrorMessage } from "../../services/api.js";
import {
  PageHeader,
  Notice,
  EmptyRow,
  btnGhost,
  btnPrimary,
  btnDanger,
  inputClass,
  tableWrap,
  th,
  td,
} from "../../components/admin/adminUi.jsx";

// CRUD sederhana yang dipakai untuk kategori dan platform
function SimpleCrud({ title, endpoint, idKey, nameKey }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);
  const [notice, setNotice] = useState(null);
  const [newName, setNewName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let ignore = false;
    api
      .get(endpoint)
      .then((res) => !ignore && setItems(res.data.data))
      .catch((err) => !ignore && setNotice({ type: "error", text: getErrorMessage(err) }))
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, [endpoint, reload]);

  const run = async (request, after) => {
    setBusy(true);
    try {
      const res = await request();
      setNotice({ type: "success", text: res.data.message });
      after?.();
      setReload((n) => n + 1);
    } catch (err) {
      setNotice({ type: "error", text: getErrorMessage(err) });
    } finally {
      setBusy(false);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    run(
      () => api.post(endpoint, { [nameKey]: newName.trim() }),
      () => setNewName(""),
    );
  };

  const handleSave = (id) => {
    if (!editName.trim()) return;
    run(
      () => api.put(`${endpoint}/${id}`, { [nameKey]: editName.trim() }),
      () => setEditId(null),
    );
  };

  const handleDelete = (item) => {
    if (!window.confirm(`Hapus "${item[nameKey]}"?`)) return;
    run(() => api.delete(`${endpoint}/${item[idKey]}`));
  };

  return (
    <section>
      <h2 className="text-xl font-bold uppercase tracking-widest text-ink">{title}</h2>

      <form onSubmit={handleAdd} className="mt-3 flex gap-2">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          maxLength={100}
          placeholder={`Nama ${title.toLowerCase()} baru`}
          className={inputClass}
        />
        <button type="submit" disabled={busy} className={`${btnPrimary} shrink-0`}>
          Tambah
        </button>
      </form>

      <Notice notice={notice} onClose={() => setNotice(null)} />

      <div className={tableWrap}>
        <table className="w-full">
          <thead className="border-b border-line">
            <tr>
              <th className={th}>Nama</th>
              <th className={th}></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {items.length === 0 ? (
              <EmptyRow colSpan={2} loading={loading} />
            ) : (
              items.map((item) => (
                <tr key={item[idKey]}>
                  <td className={td}>
                    {editId === item[idKey] ? (
                      <input
                        autoFocus
                        value={editName}
                        maxLength={100}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSave(item[idKey])}
                        className={inputClass}
                      />
                    ) : (
                      item[nameKey]
                    )}
                  </td>
                  <td className={`${td} text-right`}>
                    <div className="flex justify-end gap-2">
                      {editId === item[idKey] ? (
                        <>
                          <button
                            className={btnPrimary}
                            disabled={busy}
                            onClick={() => handleSave(item[idKey])}
                          >
                            Simpan
                          </button>
                          <button className={btnGhost} onClick={() => setEditId(null)}>
                            Batal
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className={btnGhost}
                            onClick={() => {
                              setEditId(item[idKey]);
                              setEditName(item[nameKey]);
                            }}
                          >
                            Ubah
                          </button>
                          <button
                            className={btnDanger}
                            disabled={busy}
                            onClick={() => handleDelete(item)}
                          >
                            Hapus
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function AdminMaster() {
  return (
    <div>
      <PageHeader eyebrow="Admin" title="Kategori & Platform" />
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <SimpleCrud
          title="Kategori"
          endpoint="/categories"
          idKey="category_id"
          nameKey="category_name"
        />
        <SimpleCrud
          title="Platform"
          endpoint="/platforms"
          idKey="platform_id"
          nameKey="platform_name"
        />
      </div>
    </div>
  );
}
