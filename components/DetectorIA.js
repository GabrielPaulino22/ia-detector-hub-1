import { useState } from 'react';

export default function DetectorIA() {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    } else {
      formData.append('text', text);
    }
    try {
      const response = await fetch('https://ia-detector-hub-1-git-484c9a-gabriel-paulinos-projects-ba8d9312.vercel.app/', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      console.error('Erro na análise:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h1>Detector e Humanizador de IA</h1>
      <textarea rows={10} placeholder="Cole o texto aqui..." value={text} onChange={e => setText(e.target.value)} style={{ width: '100%' }} />
      <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleSubmit} disabled={loading}>{loading ? 'Analisando...' : 'Analisar'}</button>

      {analysis && (
        <div style={{ backgroundColor: '#f1f1f1', padding: '10px', marginTop: '20px' }}>
          <p><strong>Porcentagem de IA:</strong> {analysis.percentage}%</p>
          <ul>
            {analysis.suggestions.map((s, i) => (
              <li key={i}>
                <p><strong>Original:</strong> {s.original}</p>
                <p><strong>Reescrito:</strong> {s.rewrite}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
