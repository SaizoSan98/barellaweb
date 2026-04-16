"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, Save, KeyRound, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminSettingsPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", currentPassword: "", newPassword: "", confirmPassword: "" });
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);

  useEffect(() => {
    // No need to fetch settings anymore
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setResult({ ok: false, msg: "Az új jelszavak nem egyeznek" });
      return;
    }
    setSaving(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ ok: true, msg: "Jelszó sikeresen megváltoztatva!" });
        setForm({ email: "", currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setResult({ ok: false, msg: data.error || "Hiba történt" });
      }
    } catch {
      setResult({ ok: false, msg: "Hálózati hiba" });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500";

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Beállítások</h1>
          <p className="text-sm text-gray-500">Fiók és belépési adatok kezelése</p>
        </div>
      </div>

      <div className="max-w-md space-y-6">
        {/* Jelszóváltoztatás */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <KeyRound size={18} className="text-gray-700" />
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Jelszó megváltoztatása</h2>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email cím</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="admin@barella.hu"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Jelenlegi jelszó</label>
              <input
                type="password"
                required
                value={form.currentPassword}
                onChange={e => setForm(p => ({ ...p, currentPassword: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Új jelszó (min. 8 karakter)</label>
              <input
                type="password"
                required
                minLength={8}
                value={form.newPassword}
                onChange={e => setForm(p => ({ ...p, newPassword: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Új jelszó megerősítése</label>
              <input
                type="password"
                required
                value={form.confirmPassword}
                onChange={e => setForm(p => ({ ...p, confirmPassword: e.target.value }))}
                className={inputClass}
              />
            </div>

            {result && (
              <div className={`text-sm px-3 py-2 rounded-lg ${result.ok ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                {result.msg}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg font-semibold text-sm hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <Save size={16} />
              {saving ? "Mentés..." : "Jelszó megváltoztatása"}
            </button>
          </form>
        </div>

        {/* Kijelentkezés */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Munkamenet</h2>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors"
          >
            <LogOut size={16} />
            Kijelentkezés
          </button>
        </div>
      </div>
    </div>
  );
}
