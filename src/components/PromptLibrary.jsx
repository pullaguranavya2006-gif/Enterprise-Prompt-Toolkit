import { useEffect, useState } from "react";
import {
  Copy,
  Trash2,
  RefreshCcw,
  Search,
  Check,
} from "lucide-react";

import {
  getPrompts,
  deletePrompt,
} from "../services/api";

function PromptLibrary() {

  const [prompts, setPrompts] = useState([]);
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrompts();
  }, []);

  async function loadPrompts() {

    try {

      setLoading(true);

      const data = await getPrompts();

      setPrompts(data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  }

  async function handleDelete(id) {

    if (!window.confirm("Delete this prompt?")) return;

    await deletePrompt(id);

    loadPrompts();

  }

  async function handleCopy(text, id) {

    await navigator.clipboard.writeText(text);

    setCopied(id);

    setTimeout(() => {

      setCopied(null);

    }, 2000);

  }

  const filtered = prompts.filter((prompt) =>
    prompt.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="prompt-library-page">

      <div className="page-header">

        <div>

          <p className="eyebrow">
            PROMPT MANAGEMENT
          </p>

          <h1>Prompt Library</h1>

          <p>
            Browse, search and manage saved prompts.
          </p>

        </div>

        <button
          className="secondary-button"
          onClick={loadPrompts}
        >
          <RefreshCcw size={16} />
          Refresh
        </button>

      </div>

      <div className="search-bar">

        <Search size={18} />

        <input
          placeholder="Search prompt..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {loading ? (

        <h2>Loading...</h2>

      ) : filtered.length === 0 ? (

        <div className="empty-preview">

          <h2>No prompts available</h2>

          <p>Create one using Prompt Builder.</p>

        </div>

      ) : (

        <div className="library-grid">

          {filtered.map((prompt) => (

            <div
              key={prompt.id}
              className="library-card"
            >

              <div className="library-top">

                <h3>{prompt.title}</h3>

                <span>
                  ⭐ {prompt.qualityScore}/10
                </span>

              </div>

              <p className="category">
                {prompt.category}
              </p>

              <pre>

                {prompt.prompt}

              </pre>

              <small>

                {prompt.createdAt}

              </small>

              <div className="library-actions">

                <button
                  onClick={() =>
                    handleCopy(
                      prompt.prompt,
                      prompt.id
                    )
                  }
                >

                  {

                    copied === prompt.id ?

                    <>

                      <Check size={16}/>

                      Copied

                    </>

                    :

                    <>

                      <Copy size={16}/>

                      Copy

                    </>

                  }

                </button>

                <button
                  className="delete-button"
                  onClick={() =>
                    handleDelete(prompt.id)
                  }
                >

                  <Trash2 size={16}/>

                  Delete

                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default PromptLibrary;