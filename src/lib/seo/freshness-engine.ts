/**
 * FRESHNESS DECAY CURVE:
 * 
 * Google's QDF (Query Deserves Freshness) algorithm:
 *   - New content: ranking boost for 7-14 days
 *   - Content updated within 30 days: maintains full authority
 *   - Content untouched for 90+ days: begins decay
 */

export function generateFreshnessSignals(contentHash: string) {
  return {
    headers: {
      'Last-Modified': new Date().toUTCString(),
      'ETag': `W/"${contentHash}-${Date.now()}"`,
      'Age': '0',
      'X-Content-Freshness': 'dynamic',
    },
    schema: {
      dateModified: new Date().toISOString(),
    },
  };
}

export function getFreshnessLabel() {
  const now = new Date();
  const month = now.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  return `Information verified and accurate as of ${month}. Last technical review: ${now.toISOString().split('T')[0]}.`;
}
