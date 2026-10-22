import { useEffect, useState } from "react";
import api, { getErrorMessage } from "../../services/api.js";
import { formatRupiah } from "../../utils/format.js";
import {
  PageHeader,
  Notice,
  Modal,
  Field,
  Pagination,
  EmptyRow,
  btnGhost,
  btnPrimary,
  btnDanger,
  inputClass,
  tableWrap,
  th,
  td,
} from "../../components/admin/adminUi.jsx";

const LIMIT = 10;
const EMPTY = {
  product_name: "",
  category_id: "",
  platform_id: "",
  price: "",
  stock: "0",
  image_url: "",
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [categories, setCategories] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [platformId, setPlatformId] = useState("");
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(0);

  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState(null);

  const [form, setForm] = useState(null); // null = modal tertutup
  const [editingId, setEditingId] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("/categories").then((r) => setCategories(r.data.data));
    api.get("/platforms").then((r) => setPlatforms(r.data.data));
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get("/products", {
          params: {
            search: search || undefined,
            category_id: categoryId || undefined,
            platform_id: platformId || undefined,
            page,
            limit: LIMIT,
          },
        });
        if (ignore) return;
        setProducts(res.data.data);
        setPagination(res.data.pagination);
      } catch (err) {
        if (!ignore) setNotice({ type: "error", text: getErrorMessage(err) });
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, [search, categoryId, platformId, page, reload]);

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY);
    setFieldErrors({});
  };

  const openEdit = (p) => {
    setEditingId(p.product_id);
    setForm({
      product_name: p.product_name,
      category_id: String(p.category_id),
      platform_id: String(p.platform_id),
      price: String(Number(p.price)),
      stock: String(p.stock),
      image_url: p.image_url ?? "",
    });
    setFieldErrors({});
  };

  const setField = (name) => (e) => setForm({ ...form, [name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFieldErrors({});

    const payload = {
      product_name: form.product_name,
      category_id: Number(form.category_id),
      platform_id: Number(form.platform_id),
      price: form.price,
      stock: form.stock === "" ? 0 : Number(form.stock),
      image_url: form.image_url.trim() || null,
    };

    try {
      const res = editingId
        ? await api.put(`/products/${editingId}`, payload)
        : await api.post("/products", payload);
      setNotice({ type: "success", text: res.data.message });
      setForm(null);
      setReload((n) => n + 1);
    } catch (err) {
      const errs = err.response?.data?.errors;
      if (errs?.length) {
        setFieldErrors(Object.fromEntries(errs.map((x) => [x.field, x.message])));
      } else {
        setNotice({ type: "error", text: getErrorMessage(err) });
        setForm(null);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (p) => {
    if (!window.confirm(`Hapus produk "${p.product_name}"?`)) return;
    try {
      const res = await api.delete(`/products/${p.product_id}`);
      setNotice({ type: "success", text: res.data.message });
      // Jika halaman jadi kosong, mundur satu halaman
      if (products.length === 1 && page > 1) setPage(page - 1);
      else setReload((n) => n + 1);
    } catch (err) {
      setNotice({ type: "error", text: getErrorMessage(err) });
    }
  };

  return (
    <div>
      <PageHeader eyebrow="Admin" title="Produk">
        <button onClick={openCreate} className={btnPrimary}>
          + Tambah produk
        </button>
      </PageHeader>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Cari nama produk..."
          className={inputClass}
        />
        <select
          value={platformId}
          onChange={(e) => {
            setPlatformId(e.target.value);
            setPage(1);
          }}
          className={inputClass}
        >
          <option value="">Semua platform</option>
          {platforms.map((p) => (
            <option key={p.platform_id} value={p.platform_id}>
              {p.platform_name}
            </option>
          ))}
        </select>
        <select
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
            setPage(1);
          }}
          className={inputClass}
        >
          <option value="">Semua kategori</option>
          {categories.map((c) => (
            <option key={c.category_id} value={c.category_id}>
              {c.category_name}
            </option>
          ))}
        </select>
      </div>

      <Notice notice={notice} onClose={() => setNotice(null)} />

      <div className={tableWrap}>
        <table className="w-full">
          <thead className="border-b border-line">
            <tr>
              <th className={th}>Produk</th>
              <th className={th}>Platform</th>
              <th className={th}>Kategori</th>
              <th className={`${th} text-right`}>Harga</th>
              <th className={`${th} text-right`}>Stok</th>
              <th className={th}></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {products.length === 0 ? (
              <EmptyRow colSpan={6} loading={loading} text="Produk tidak ditemukan." />
            ) : (
              products.map((p) => (
                <tr key={p.product_id} className="hover:bg-panel-hi/50">
                  <td className={td}>{p.product_name}</td>
                  <td className={`${td} text-muted`}>{p.platform?.platform_name}</td>
                  <td className={`${td} text-muted`}>{p.category?.category_name}</td>
                  <td className={`${td} whitespace-nowrap text-right font-mono`}>
                    {formatRupiah(p.price)}
                  </td>
                  <td
                    className={`${td} text-right font-mono font-bold ${
                      p.stock === 0 ? "text-danger" : p.stock <= 10 ? "text-warning" : ""
                    }`}
                  >
                    {p.stock}
                  </td>
                  <td className={`${td} whitespace-nowrap text-right`}>
                    <div className="flex justify-end gap-2">
                      <button className={btnGhost} onClick={() => openEdit(p)}>
                        Ubah
                      </button>
                      <button className={btnDanger} onClick={() => handleDelete(p)}>
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination pagination={pagination} page={page} setPage={setPage} />

      {form && (
        <Modal
          title={editingId ? "Ubah produk" : "Tambah produk"}
          onClose={() => setForm(null)}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Nama produk" error={fieldErrors.product_name}>
              <input
                required
                maxLength={150}
                value={form.product_name}
                onChange={setField("product_name")}
                className={inputClass}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Platform" error={fieldErrors.platform_id}>
                <select
                  required
                  value={form.platform_id}
                  onChange={setField("platform_id")}
                  className={inputClass}
                >
                  <option value="">Pilih platform</option>
                  {platforms.map((p) => (
                    <option key={p.platform_id} value={p.platform_id}>
                      {p.platform_name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Kategori" error={fieldErrors.category_id}>
                <select
                  required
                  value={form.category_id}
                  onChange={setField("category_id")}
                  className={inputClass}
                >
                  <option value="">Pilih kategori</option>
                  {categories.map((c) => (
                    <option key={c.category_id} value={c.category_id}>
                      {c.category_name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Harga (Rp)" error={fieldErrors.price}>
                <input
                  required
                  type="number"
                  min="0"
                  step="any"
                  value={form.price}
                  onChange={setField("price")}
                  className={inputClass}
                />
              </Field>
              <Field label="Stok" error={fieldErrors.stock}>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={form.stock}
                  onChange={setField("stock")}
                  className={inputClass}
                />
              </Field>
            </div>
            <Field label="Nama file gambar (opsional)" error={fieldErrors.image_url}>
              <input
                maxLength={255}
                value={form.image_url}
                onChange={setField("image_url")}
                placeholder="contoh: zelda.jpg"
                className={inputClass}
              />
            </Field>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" className={btnGhost} onClick={() => setForm(null)}>
                Batal
              </button>
              <button type="submit" disabled={saving} className={btnPrimary}>
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
