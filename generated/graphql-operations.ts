import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Timestamp: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type Card = {
  __typename?: 'Card';
  created: Scalars['Timestamp']['output'];
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order: Scalars['Int']['output'];
  story_points?: Maybe<Scalars['Int']['output']>;
  uuid: Scalars['UUID']['output'];
};

export type Column = {
  __typename?: 'Column';
  cards: Array<Card>;
  description: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  order: Scalars['Int']['output'];
  type?: Maybe<ColumnType>;
  uuid: Scalars['UUID']['output'];
};

export enum ColumnType {
  Done = 'done',
  InProgress = 'in_progress',
  Todo = 'todo'
}

export type IProjectBase = {
  created: Scalars['Timestamp']['output'];
  name: Scalars['String']['output'];
  uuid: Scalars['UUID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  projects: ProjectsMutation;
};

export type Project = IProjectBase & {
  __typename?: 'Project';
  columns: Array<Column>;
  created: Scalars['Timestamp']['output'];
  name: Scalars['String']['output'];
  uuid: Scalars['UUID']['output'];
};

export type ProjectBase = IProjectBase & {
  __typename?: 'ProjectBase';
  created: Scalars['Timestamp']['output'];
  name: Scalars['String']['output'];
  uuid: Scalars['UUID']['output'];
};

export type ProjectsMutation = {
  __typename?: 'ProjectsMutation';
  create: Project;
  update: Project;
};


export type ProjectsMutationCreateArgs = {
  name: Scalars['String']['input'];
};


export type ProjectsMutationUpdateArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  uuid: Scalars['UUID']['input'];
};

export type Query = {
  __typename?: 'Query';
  project?: Maybe<Project>;
  projects: Array<ProjectBase>;
};


export type QueryProjectArgs = {
  projectUuid: Scalars['UUID']['input'];
};

export type ProjectQueryVariables = Exact<{
  projectUuid: Scalars['UUID']['input'];
}>;


export type ProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', uuid: any, name: string, created: any, columns: Array<{ __typename?: 'Column', uuid: any, name?: string | null, order: number, type?: ColumnType | null, description: string, cards: Array<{ __typename?: 'Card', uuid: any, name?: string | null, description?: string | null, story_points?: number | null, created: any, order: number }> }> } | null };


export const ProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Project"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectUuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectUuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectUuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"story_points"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProjectQuery, ProjectQueryVariables>;