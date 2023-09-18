import { OpenAI } from 'langchain/llms';
import { LLMChain, ChatVectorDBQAChain, loadQAChain } from 'langchain/chains';
import { HNSWLib, SupabaseVectorStore } from 'langchain/vectorstores';
import { PromptTemplate } from 'langchain/prompts';

const CONDENSE_PROMPT =
  PromptTemplate.fromTemplate(`给定以下对话和一个后续问题，将后续问题重新表述为一个独立的问题。
对话历史:
{chat_history}
后续问题: {question}
独立的问题:`);

const QA_PROMPT = PromptTemplate.fromTemplate(
  `你是一个AI助手和专家。你被提供了以下长篇文档的摘录和一个问题。基于所提供的上下文，提供一个符合对话的回答。
你只能使用作为上下文中明确列出的源作为参考的超链接。不要虚构一个在上下文中未列出的超链接。

问题: {question}
=========
{context}
=========
用Markdown格式回答:`,
);
export const makeChain = (
  vectorstore: SupabaseVectorStore,
  onTokenStream?: (token: string) => void,
) => {
  const questionGenerator = new LLMChain({
    llm: new OpenAI({ temperature: 0 }),
    prompt: CONDENSE_PROMPT,
  });
  const docChain = loadQAChain(
    new OpenAI({
      temperature: 0,
      streaming: Boolean(onTokenStream),
      callbackManager: {
        handleNewToken: onTokenStream,
      },
    }),
    { prompt: QA_PROMPT },
  );

  return new ChatVectorDBQAChain({
    vectorstore,
    combineDocumentsChain: docChain,
    questionGeneratorChain: questionGenerator,
  });
};
