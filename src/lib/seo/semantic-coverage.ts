/**
 * SEMANTIC COVERAGE MAP (TF-IDF Optimization)
 * 
 * Based on analysis of top-ranking pages, these are the REQUIRED
 * co-occurring terms Google expects to find for comprehensive coverage.
 */

export const semanticCoverageMap: Record<string, string[]> = {
  'custom llm development': [
    'large language model', 'fine-tuning', 'training data', 'inference',
    'deployment', 'natural language processing', 'transformer',
    'tokenization', 'embeddings', 'vector database', 'prompt engineering',
    'RAG', 'retrieval augmented generation', 'context window',
    'hallucination', 'evaluation', 'benchmark', 'RLHF',
    'Llama', 'Mistral', 'GPT', 'open source', 'proprietary data',
    'data privacy', 'on-premise', 'cloud deployment', 'API endpoint',
  ],

  'ai saas development': [
    'software as a service', 'multi-tenant', 'authentication',
    'subscription billing', 'dashboard', 'API', 'microservices',
    'database', 'cloud infrastructure', 'scalability', 'CI/CD',
    'monitoring', 'analytics', 'user management', 'role-based access',
    'webhook', 'integration', 'REST API', 'GraphQL', 'serverless',
  ],

  'workflow automation ai': [
    'business process', 'robotic process automation', 'RPA',
    'trigger', 'action', 'conditional logic', 'integration',
    'API connector', 'no-code', 'low-code', 'human-in-the-loop',
    'approval workflow', 'notification', 'scheduling', 'ETL',
    'data pipeline', 'error handling', 'retry logic', 'audit trail',
  ],
};

export function auditSemanticCoverage(
  pageContent: string,
  targetKeyword: string
): { covered: string[]; missing: string[]; score: number } {
  const requiredTerms = semanticCoverageMap[targetKeyword] || [];
  const lowerContent = pageContent.toLowerCase();
  
  const covered = requiredTerms.filter(term => 
    lowerContent.includes(term.toLowerCase())
  );
  const missing = requiredTerms.filter(term => 
    !lowerContent.includes(term.toLowerCase())
  );

  return {
    covered,
    missing,
    score: Math.round((covered.length / requiredTerms.length) * 100),
  };
}
