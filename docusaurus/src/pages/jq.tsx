/*
 * SPDX-FileCopyrightText: (C) 2026 Hong Yongmin (https://revi.xyz/) <yewon@revi.email>
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './jq.module.css';

const SAMPLE =
  '{"name":"JSON Formatter","features":["Fast formatting","Mobile-friendly copy","Syntax highlighting"],"settings":{"indentation":2,"valid":true}}';

function highlightJson(json: string) {
  const tokens = json.split(
    /("(?:\\.|[^\\"])*"\s*:|"(?:\\.|[^\\"])*"|true|false|null|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g,
  );
  return tokens.map((token, index) => {
    let className = '';
    if (/^".*"\s*:$/s.test(token)) className = styles.key;
    else if (/^".*"$/s.test(token)) className = styles.string;
    else if (/^-?\d/.test(token)) className = styles.number;
    else if (/^(true|false)$/.test(token)) className = styles.boolean;
    else if (token === 'null') className = styles.null;
    return className ? (
      <span className={className} key={index}>
        {token}
      </span>
    ) : (
      token
    );
  });
}

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [indent, setIndent] = useState('2');
  const [customIndent, setCustomIndent] = useState('3');
  const [status, setStatus] = useState('');
  const spacing =
    indent === 'tab'
      ? '\t'
      : indent === 'custom'
        ? Math.min(10, Math.max(0, Math.trunc(Number(customIndent) || 0)))
        : Number(indent);
  const {output, error} = useMemo(() => {
    if (!input.trim()) return {output: '', error: ''};
    try {
      return {
        output: JSON.stringify(JSON.parse(input), null, spacing),
        error: '',
      };
    } catch (caught) {
      return {
        output: '',
        error:
          caught instanceof Error
            ? caught.message
            : 'The JSON could not be parsed.',
      };
    }
  }, [input, spacing]);
  const highlighted = useMemo(() => highlightJson(output), [output]);

  function updateInput(value: string) {
    setInput(value);
    setStatus('');
  }

  async function pasteInput() {
    try {
      const text = await navigator.clipboard.readText();
      if (text) updateInput(text);
      setStatus(text ? 'Pasted.' : 'Your clipboard is empty.');
    } catch {
      setStatus(
        'Clipboard access was blocked. Use your device’s Paste command.',
      );
    }
  }

  async function copyOutput() {
    try {
      await navigator.clipboard.writeText(output);
      setStatus('Copied.');
    } catch {
      const fallback = document.createElement('textarea');
      const previousFocus = document.activeElement;
      fallback.value = output;
      fallback.readOnly = true;
      fallback.style.position = 'fixed';
      fallback.style.opacity = '0';
      document.body.appendChild(fallback);
      fallback.select();
      try {
        setStatus(
          document.execCommand('copy')
            ? 'Copied.'
            : 'Copy was blocked. Select the result and copy it manually.',
        );
      } catch {
        setStatus('Copy was blocked. Select the result and copy it manually.');
      } finally {
        fallback.remove();
        if (previousFocus instanceof HTMLElement) previousFocus.focus();
      }
    }
  }

  return (
    <Layout
      title="JSON Formatter"
      description="Format JSON with custom indentation, syntax highlighting, and easy copying.">
      <main className={`container margin-vert--lg ${styles.page}`}>
        <Heading as="h1">Make JSON readable.</Heading>
        <p>
          Paste JSON, choose an indentation style, and get clean, highlighted
          output ready to copy.
        </p>
        <p>JSON is processed in your browser and is not uploaded.</p>
        <noscript>Enable JavaScript to use the JSON formatter.</noscript>
        <section
          className={styles.workspace}
          aria-label="JSON formatting workspace">
          <section className={styles.panel} aria-labelledby="json-input-title">
            <div className={styles.toolbar}>
              <Heading as="h2" id="json-input-title">
                Input
              </Heading>
              <div className={styles.actions}>
                <button type="button" onClick={pasteInput}>
                  Paste
                </button>
                <button type="button" onClick={() => updateInput(SAMPLE)}>
                  Load sample
                </button>
                <button type="button" onClick={() => updateInput('')}>
                  Clear
                </button>
              </div>
            </div>
            <fieldset className={styles.controls}>
              <legend>Indentation</legend>
              <div className={styles.choices}>
                {['1', '2', '4', '8', 'tab', 'custom'].map((choice) => (
                  <label key={choice}>
                    <input
                      type="radio"
                      name="indentation"
                      value={choice}
                      checked={indent === choice}
                      onChange={() => {
                        setIndent(choice);
                        setStatus('');
                      }}
                    />
                    {choice === 'tab'
                      ? 'Tab'
                      : choice === 'custom'
                        ? 'Custom'
                        : choice}
                  </label>
                ))}
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="1"
                  inputMode="numeric"
                  value={customIndent}
                  aria-label="Custom indentation level, 0 to 10 spaces"
                  onFocus={() => {
                    setIndent('custom');
                    setStatus('');
                  }}
                  onChange={(event) => {
                    setCustomIndent(event.target.value);
                    setIndent('custom');
                    setStatus('');
                  }}
                  onBlur={() =>
                    setCustomIndent(
                      String(
                        Math.min(
                          10,
                          Math.max(0, Math.trunc(Number(customIndent) || 0)),
                        ),
                      ),
                    )
                  }
                />
              </div>
            </fieldset>
            <label className="sr-only" htmlFor="json-input">
              JSON input
            </label>
            <textarea
              id="json-input"
              className={styles.input}
              value={input}
              onChange={(event) => updateInput(event.target.value)}
              placeholder={'Paste JSON here…\n\n{"hello": "world"}'}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'json-error' : undefined}
            />
            {error && (
              <div
                id="json-error"
                className="alert alert--danger margin--sm"
                role="alert">
                <strong>Invalid JSON</strong>
                <p className={styles.error}>{error}</p>
              </div>
            )}
          </section>
          <section className={styles.panel} aria-labelledby="json-output-title">
            <div className={styles.toolbar}>
              <Heading as="h2" id="json-output-title">
                Formatted result
              </Heading>
              <button type="button" onClick={copyOutput} disabled={!output}>
                Copy
              </button>
            </div>
            <div className={styles.result}>
              {output ? (
                <pre
                  className={styles.output}
                  tabIndex={0}
                  aria-label="Formatted JSON">
                  <code>{highlighted}</code>
                </pre>
              ) : (
                <div className={styles.empty}>
                  <span aria-hidden="true">{'{ }'}</span>
                  <p>Your formatted JSON will appear here.</p>
                </div>
              )}
            </div>
          </section>
        </section>
        <p role="status" className="margin-top--sm">
          {status}
        </p>
      </main>
    </Layout>
  );
}
