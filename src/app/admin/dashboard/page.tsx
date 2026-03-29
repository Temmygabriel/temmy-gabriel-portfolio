'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Project {
  id: string;
  title: string;
  description: string;
  tools: string[];
  outcome: string;
  link: string;
  featured: boolean;
  order: number;
  category: string;
  metric: string;
  highlight: string;
}

type FormData = {
  title: string;
  description: string;
  tools: string[];
  outcome: string;
  link: string;
  featured: boolean;
  category: string;
  metric: string;
  highlight: string;
};

const EMPTY: FormData = {
  title: '',
  description: '',
  tools: [],
  outcome: '',
  link: '',
  featured: false,
  category: '',
  metric: '',
  highlight: '',
};

const TEXT_FIELDS = ['title', 'outcome', 'metric', 'highlight', 'category', 'link'] as const;
const TEXTAREA_FIELDS = ['description'] as const;
type TextField = typeof TEXT_FIELDS[number];
type TextareaField = typeof TEXTAREA_FIELDS[number];

export default function AdminDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [toolsInput, setToolsInput] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchProjects = useCallback(async () => {
    const res = await fetch('/api/admin/projects');
    if (res.status === 401) { router.push('/admin'); return; }
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  }, [router]);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const showMsg = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const openNew = () => {
    setEditingId(null);
    setForm(EMPTY);
    setToolsInput('');
    setShowForm(true);
  };

  const openEdit = (p: Project) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      description: p.description,
      tools: p.tools,
      outcome: p.outcome,
      link: p.link,
      featured: p.featured,
      category: p.category,
      metric: p.metric,
      highlight: p.highlight,
    });
    setToolsInput(p.tools.join(', '));
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      ...form,
      tools: toolsInput.split(',').map(t => t.trim()).filter(Boolean),
      id: editingId || undefined,
    };
    const res = await fetch('/api/admin/projects', {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      showMsg(editingId ? '✓ Project updated & committed to GitHub' : '✓ Project added & committed to GitHub');
      setShowForm(false);
      fetchProjects();
    } else {
      showMsg('✗ Error saving project');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project? This will commit to GitHub.')) return;
    setSaving(true);
    await fetch('/api/admin/projects', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setSaving(false);
    showMsg('✓ Project deleted');
    fetchProjects();
  };

  const toggleFeatured = async (p: Project) => {
    setSaving(true);
    await fetch('/api/admin/projects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...p, featured: !p.featured }),
    });
    setSaving(false);
    showMsg('✓ Featured status updated');
    fetchProjects();
  };

  const updateTextField = (field: TextField, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const updateTextareaField = (field: TextareaField, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  if (loading) return (
    <div className="min-h-screen bg-[#080C14] flex items-center justify-center">
      <div className="font-mono text-[#5A7A94] text-sm animate-pulse">Loading projects...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#080C14] text-[#F0F4F8]">
      {/* Header */}
      <div className="bg-[#0D1420] border-b border-[#1E2D3D] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[#2E86AB]/20 border border-[#2E86AB]/40 flex items-center justify-center">
            <span className="font-mono text-xs text-[#38B2D8] font-bold">TG</span>
          </div>
          <div>
            <p className="font-mono text-sm text-[#F0F4F8]">Admin Dashboard</p>
            <p className="font-mono text-xs text-[#5A7A94]">Changes auto-commit to GitHub &amp; redeploy</p>
          </div>
        </div>
        <a href="/" className="font-mono text-xs text-[#5A7A94] hover:text-[#9DB4C8] transition-colors">
          ← View site
        </a>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Message */}
        {message && (
          <div className={`mb-6 px-4 py-3 rounded-lg font-mono text-sm border ${
            message.startsWith('✓')
              ? 'bg-green-500/10 border-green-500/20 text-green-400'
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
            {message}
          </div>
        )}

        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl text-[#F0F4F8]" style={{ fontFamily: 'var(--font-display)' }}>Projects</h1>
            <p className="text-[#5A7A94] text-sm mt-1">
              {projects.length} projects · {projects.filter(p => p.featured).length} featured
            </p>
          </div>
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2E86AB] hover:bg-[#38B2D8] text-white font-medium text-sm transition-all"
          >
            <span className="text-lg leading-none">+</span>
            Add project
          </button>
        </div>

        {/* Project list */}
        <div className="space-y-3">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-[#0D1420] border border-[#1E2D3D] rounded-xl p-5 flex items-start gap-4 hover:border-[#2E86AB]/30 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-[#2E86AB]">#{p.order}</span>
                  {p.featured && (
                    <span className="text-xs font-mono bg-[#2E86AB]/10 text-[#38B2D8] border border-[#2E86AB]/20 px-2 py-0.5 rounded-full">
                      ★ Featured
                    </span>
                  )}
                  <span className="text-xs text-[#5A7A94] font-mono">{p.category}</span>
                </div>
                <h3 className="text-[#F0F4F8] font-medium truncate">{p.title}</h3>
                <p className="text-[#5A7A94] text-xs mt-1 line-clamp-1">{p.metric}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.tools.slice(0, 4).map(t => (
                    <span key={t} className="tool-tag text-[10px]">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleFeatured(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                    p.featured
                      ? 'bg-[#2E86AB]/10 border-[#2E86AB]/30 text-[#38B2D8]'
                      : 'border-[#1E2D3D] text-[#5A7A94] hover:text-[#9DB4C8]'
                  }`}
                >
                  {p.featured ? '★ Unfeature' : '☆ Feature'}
                </button>
                <button
                  onClick={() => openEdit(p)}
                  className="px-3 py-1.5 rounded-lg border border-[#1E2D3D] text-[#9DB4C8] text-xs font-mono hover:border-[#2E86AB]/40 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-3 py-1.5 rounded-lg border border-[#1E2D3D] text-red-400 text-xs font-mono hover:border-red-500/40 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide-over form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="w-full max-w-lg bg-[#0D1420] border-l border-[#1E2D3D] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-[#F0F4F8]" style={{ fontFamily: 'var(--font-display)' }}>
                {editingId ? 'Edit Project' : 'New Project'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-[#5A7A94] hover:text-white text-xl">×</button>
            </div>

            <div className="space-y-5">
              {/* Text fields */}
              {TEXT_FIELDS.map((field) => (
                <div key={field}>
                  <label className="block font-mono text-xs text-[#5A7A94] mb-1.5 tracking-wide uppercase">
                    {field}
                  </label>
                  <input
                    type="text"
                    value={form[field] as string}
                    onChange={(e) => updateTextField(field, e.target.value)}
                    className="w-full bg-[#080C14] border border-[#1E2D3D] rounded-lg px-3 py-2.5 text-[#F0F4F8] text-sm focus:outline-none focus:border-[#2E86AB] transition-colors"
                  />
                </div>
              ))}

              {/* Textarea fields */}
              {TEXTAREA_FIELDS.map((field) => (
                <div key={field}>
                  <label className="block font-mono text-xs text-[#5A7A94] mb-1.5 tracking-wide uppercase">
                    {field}
                  </label>
                  <textarea
                    value={form[field]}
                    onChange={(e) => updateTextareaField(field, e.target.value)}
                    rows={3}
                    className="w-full bg-[#080C14] border border-[#1E2D3D] rounded-lg px-3 py-2.5 text-[#F0F4F8] text-sm focus:outline-none focus:border-[#2E86AB] transition-colors resize-none"
                  />
                </div>
              ))}

              {/* Outcome - textarea */}
              <div>
                <label className="block font-mono text-xs text-[#5A7A94] mb-1.5 tracking-wide uppercase">
                  outcome
                </label>
                <textarea
                  value={form.outcome}
                  onChange={(e) => setForm(prev => ({ ...prev, outcome: e.target.value }))}
                  rows={3}
                  className="w-full bg-[#080C14] border border-[#1E2D3D] rounded-lg px-3 py-2.5 text-[#F0F4F8] text-sm focus:outline-none focus:border-[#2E86AB] transition-colors resize-none"
                />
              </div>

              {/* Tools */}
              <div>
                <label className="block font-mono text-xs text-[#5A7A94] mb-1.5 tracking-wide uppercase">
                  Tools (comma-separated)
                </label>
                <input
                  type="text"
                  value={toolsInput}
                  onChange={(e) => setToolsInput(e.target.value)}
                  placeholder="Python, SQL, Power BI"
                  className="w-full bg-[#080C14] border border-[#1E2D3D] rounded-lg px-3 py-2.5 text-[#F0F4F8] text-sm focus:outline-none focus:border-[#2E86AB] transition-colors"
                />
              </div>

              {/* Featured toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={(e) => setForm(prev => ({ ...prev, featured: e.target.checked }))}
                  className="w-4 h-4 accent-[#2E86AB]"
                />
                <label htmlFor="featured" className="font-mono text-xs text-[#9DB4C8]">
                  Featured project
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-[#1E2D3D]">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 py-3 rounded-lg bg-[#2E86AB] hover:bg-[#38B2D8] text-white font-medium transition-all disabled:opacity-50"
                >
                  {saving ? 'Saving to GitHub...' : 'Save & Deploy'}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 rounded-lg border border-[#1E2D3D] text-[#9DB4C8] hover:text-white transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
