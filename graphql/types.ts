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
  DateTime: { input: string; output: string; }
  EmailAddress: { input: any; output: any; }
  HexColorCode: { input: any; output: any; }
  URL: { input: any; output: any; }
  UUID: { input: string; output: string; }
  Void: { input: any; output: any; }
};

/** Basic card */
export type Card = ICard & {
  __typename?: 'Card';
  /** Assigned users */
  assignees: Array<User>;
  /** Assigned column */
  column?: Maybe<Column>;
  /** Creation time */
  created: Scalars['DateTime']['output'];
  /** Deadline */
  deadline?: Maybe<Scalars['DateTime']['output']>;
  /** Card description as Markdown */
  description?: Maybe<Scalars['String']['output']>;
  /** Assigned milestone */
  milestone?: Maybe<Milestone>;
  /** Display name */
  name?: Maybe<Scalars['String']['output']>;
  /** Order in column */
  order: Scalars['Int']['output'];
  /** Assigned story points */
  story_points?: Maybe<Scalars['Int']['output']>;
  /** Assigned tags */
  tags: Array<Tag>;
  /** UUID */
  uuid: Scalars['UUID']['output'];
};

/** Card with values of all fields */
export type CardDetails = ICard & {
  __typename?: 'CardDetails';
  /** Assigned users */
  assignees: Array<User>;
  /** Assigned column */
  column?: Maybe<Column>;
  /** Creation time */
  created: Scalars['DateTime']['output'];
  /** Deadline */
  deadline?: Maybe<Scalars['DateTime']['output']>;
  /** Card description as Markdown */
  description?: Maybe<Scalars['String']['output']>;
  /** Card fields */
  fields: Array<CardField>;
  /** Assigned milestone */
  milestone?: Maybe<Milestone>;
  /** Display name */
  name?: Maybe<Scalars['String']['output']>;
  /** Order in column */
  order: Scalars['Int']['output'];
  /** Assigned story points */
  story_points?: Maybe<Scalars['Int']['output']>;
  /** Assigned tags */
  tags: Array<Tag>;
  /** UUID */
  uuid: Scalars['UUID']['output'];
};

/** Represents card field with value */
export type CardField = {
  __typename?: 'CardField';
  /** Field value */
  data: FieldValue;
  /** Field type */
  field_type: CardFieldType;
  /** Field uuid */
  field_uuid: Scalars['UUID']['output'];
};

/** Possible card field types */
export enum CardFieldType {
  /** Boolean field */
  Checkbox = 'checkbox',
  /** Date field */
  Date = 'date',
  /** Dropdown with multiple selections */
  DropdownMultiple = 'dropdown_multiple',
  /** Dropdown with one selection */
  DropdownSingle = 'dropdown_single',
  /** Number field */
  Number = 'number',
  /** Text field */
  Text = 'text'
}

/** Card-specific mutations */
export type CardsMutation = {
  __typename?: 'CardsMutation';
  /** Create card */
  create: Card;
  /** Swap card position with another card */
  swap?: Maybe<Scalars['Void']['output']>;
  /** Update custom checkbox field */
  update_checkbox_field: Card;
  /** Update custom date field */
  update_date_field: Card;
  /** Update card details */
  update_details: Card;
  /** Update custom number field */
  update_number_field: Card;
  /** Update custom select field */
  update_select_field: Card;
  /** Update custom text field */
  update_text_field: Card;
};


/** Card-specific mutations */
export type CardsMutationCreateArgs = {
  assignee_uuids?: InputMaybe<Array<Scalars['UUID']['input']>>;
  column_uuid: Scalars['UUID']['input'];
  deadline?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  milestone_uuid?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  story_points?: InputMaybe<Scalars['Int']['input']>;
  tag_uuids?: InputMaybe<Array<Scalars['UUID']['input']>>;
};


/** Card-specific mutations */
export type CardsMutationSwapArgs = {
  other_uuid: Scalars['UUID']['input'];
  uuid: Scalars['UUID']['input'];
};


/** Card-specific mutations */
export type CardsMutationUpdate_Checkbox_FieldArgs = {
  card_uuid: Scalars['UUID']['input'];
  field_uuid: Scalars['UUID']['input'];
  value: Scalars['Boolean']['input'];
};


/** Card-specific mutations */
export type CardsMutationUpdate_Date_FieldArgs = {
  card_uuid: Scalars['UUID']['input'];
  field_uuid: Scalars['UUID']['input'];
  value: Scalars['DateTime']['input'];
};


/** Card-specific mutations */
export type CardsMutationUpdate_DetailsArgs = {
  assignee_uuids?: InputMaybe<Array<Scalars['UUID']['input']>>;
  column_uuid?: InputMaybe<Scalars['UUID']['input']>;
  deadline?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  milestone_uuid?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  story_points?: InputMaybe<Scalars['Int']['input']>;
  tag_uuids?: InputMaybe<Array<Scalars['UUID']['input']>>;
  uuid: Scalars['UUID']['input'];
};


/** Card-specific mutations */
export type CardsMutationUpdate_Number_FieldArgs = {
  card_uuid: Scalars['UUID']['input'];
  field_uuid: Scalars['UUID']['input'];
  value: Scalars['Float']['input'];
};


/** Card-specific mutations */
export type CardsMutationUpdate_Select_FieldArgs = {
  card_uuid: Scalars['UUID']['input'];
  field_uuid: Scalars['UUID']['input'];
  value_uuid: Scalars['UUID']['input'];
};


/** Card-specific mutations */
export type CardsMutationUpdate_Text_FieldArgs = {
  card_uuid: Scalars['UUID']['input'];
  field_uuid: Scalars['UUID']['input'];
  value: Scalars['String']['input'];
};

/** Represents column */
export type Column = {
  __typename?: 'Column';
  /** Contained cards */
  cards: Array<Card>;
  /** Description as plain text */
  description?: Maybe<Scalars['String']['output']>;
  /** Display name */
  name?: Maybe<Scalars['String']['output']>;
  /** Order in which to display the column */
  order: Scalars['Int']['output'];
  /** Column type */
  type?: Maybe<ColumnType>;
  /** UUID */
  uuid: Scalars['UUID']['output'];
};

/** Column-specific mutations */
export type ColumnMutation = {
  __typename?: 'ColumnMutation';
  /** Create column */
  create: Column;
  /** Swap column position with another column */
  swap?: Maybe<Scalars['Void']['output']>;
  /** Update column */
  update: Column;
};


/** Column-specific mutations */
export type ColumnMutationCreateArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  project_uuid: Scalars['UUID']['input'];
  type?: InputMaybe<ColumnType>;
};


/** Column-specific mutations */
export type ColumnMutationSwapArgs = {
  other_uuid: Scalars['UUID']['input'];
  uuid: Scalars['UUID']['input'];
};


/** Column-specific mutations */
export type ColumnMutationUpdateArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ColumnType>;
  uuid: Scalars['UUID']['input'];
};

/** Type of the column, used for burnout chart calculations */
export enum ColumnType {
  /** Cards in this column are considered as finished */
  Done = 'done',
  /** Cards in this column are considered as being worked on */
  InProgress = 'in_progress',
  /** Cards in this column are considered as not being worked on */
  Todo = 'todo'
}

/** Represents checkbox field value */
export type FieldCheckboxValue = {
  __typename?: 'FieldCheckboxValue';
  /** Value as a boolean */
  checkbox_value: Scalars['Boolean']['output'];
};

/** Represents date field value */
export type FieldDateValue = {
  __typename?: 'FieldDateValue';
  /** Value as a date */
  date_value: Scalars['DateTime']['output'];
};

/** Represents number field value */
export type FieldNumberValue = {
  __typename?: 'FieldNumberValue';
  /** Value as a number */
  number_value: Scalars['Float']['output'];
};

/** Represents dropdown field value */
export type FieldSelectValue = {
  __typename?: 'FieldSelectValue';
  /** Value as a string */
  select_value: Scalars['String']['output'];
};

/** Represents text field value */
export type FieldTextValue = {
  __typename?: 'FieldTextValue';
  /** Value as a text */
  text_value?: Maybe<Scalars['String']['output']>;
};

/** All possible field values */
export type FieldValue = FieldCheckboxValue | FieldDateValue | FieldNumberValue | FieldSelectValue | FieldTextValue;

/** Represents basic interface for a card */
export type ICard = {
  /** Assigned users */
  assignees: Array<User>;
  /** Assigned column */
  column?: Maybe<Column>;
  /** Creation time */
  created: Scalars['DateTime']['output'];
  /** Deadline */
  deadline?: Maybe<Scalars['DateTime']['output']>;
  /** Card description as Markdown */
  description?: Maybe<Scalars['String']['output']>;
  /** Assigned milestone */
  milestone?: Maybe<Milestone>;
  /** Display name */
  name?: Maybe<Scalars['String']['output']>;
  /** Order in column */
  order: Scalars['Int']['output'];
  /** Assigned story points */
  story_points?: Maybe<Scalars['Int']['output']>;
  /** Assigned tags */
  tags: Array<Tag>;
  /** UUID */
  uuid: Scalars['UUID']['output'];
};

/** Represents basic interface for a project */
export type IProject = {
  /** Creation time */
  created: Scalars['DateTime']['output'];
  /** Display name */
  name: Scalars['String']['output'];
  /** Project UUID */
  uuid: Scalars['UUID']['output'];
};

/** Represents basic interface for a user */
export type IUser = {
  /** Email address */
  email?: Maybe<Scalars['EmailAddress']['output']>;
  /** Profile picture url */
  image?: Maybe<Scalars['URL']['output']>;
  /** Display name */
  name?: Maybe<Scalars['String']['output']>;
  /** User UUID */
  uuid?: Maybe<Scalars['UUID']['output']>;
};

/** Represents a milestone */
export type Milestone = {
  __typename?: 'Milestone';
  /** Assigned cards */
  cards: Array<Card>;
  /** Creation time */
  creation_timestamp: Scalars['DateTime']['output'];
  /** Deadline */
  deadline?: Maybe<Scalars['DateTime']['output']>;
  /** Display name */
  name?: Maybe<Scalars['String']['output']>;
  /** Milestone UUID */
  uuid: Scalars['UUID']['output'];
};

/** Milestone-specific mutations */
export type MilestoneMutation = {
  __typename?: 'MilestoneMutation';
  /** Assign card */
  assign_card: Column;
  /** Create milestone */
  create: Milestone;
  /** Unassign card */
  unassign_card: Column;
  /** Update milestone information */
  update?: Maybe<Milestone>;
};


/** Milestone-specific mutations */
export type MilestoneMutationAssign_CardArgs = {
  card_uuid: Scalars['UUID']['input'];
  milestone_uuid: Scalars['UUID']['input'];
};


/** Milestone-specific mutations */
export type MilestoneMutationCreateArgs = {
  deadline?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  project_uuid: Scalars['UUID']['input'];
};


/** Milestone-specific mutations */
export type MilestoneMutationUnassign_CardArgs = {
  card_uuid: Scalars['UUID']['input'];
};


/** Milestone-specific mutations */
export type MilestoneMutationUpdateArgs = {
  deadline?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  project_uuid?: InputMaybe<Scalars['UUID']['input']>;
  uuid: Scalars['UUID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Mutations related to cards */
  cards: CardsMutation;
  /** Mutations related to columns */
  columns: ColumnMutation;
  /** Mutations related to milestones */
  milestones: MilestoneMutation;
  /** Mutations related to projects */
  projects: ProjectsMutation;
  /** Mutations related to users */
  users: UsersMutation;
};

/** Basic project */
export type Project = IProject & {
  __typename?: 'Project';
  /** Creation time */
  created: Scalars['DateTime']['output'];
  /** Display name */
  name: Scalars['String']['output'];
  /** Project UUID */
  uuid: Scalars['UUID']['output'];
};

/** Represents a project with information about contained columns */
export type ProjectDetails = IProject & {
  __typename?: 'ProjectDetails';
  /** Contained columns */
  columns: Array<Column>;
  /** Creation time */
  created: Scalars['DateTime']['output'];
  /** Milestones */
  milestones: Array<Milestone>;
  /** Display name */
  name: Scalars['String']['output'];
  /** Tags */
  tags: Array<Tag>;
  /** Assigned users */
  users: Array<ProjectUser>;
  /** Project UUID */
  uuid: Scalars['UUID']['output'];
};

/** Represents a user */
export type ProjectUser = IUser & {
  __typename?: 'ProjectUser';
  /** Email address */
  email?: Maybe<Scalars['EmailAddress']['output']>;
  /** Profile picture url */
  image?: Maybe<Scalars['URL']['output']>;
  /** Display name */
  name?: Maybe<Scalars['String']['output']>;
  /** Permission level for the project */
  permissions?: Maybe<Scalars['Int']['output']>;
  /** User UUID */
  uuid?: Maybe<Scalars['UUID']['output']>;
};

/** Project-specific mutations */
export type ProjectsMutation = {
  __typename?: 'ProjectsMutation';
  /** Add user to project */
  add_user: ProjectDetails;
  /** Create a new project */
  create: ProjectDetails;
  /** Remove user from project */
  remove_user: ProjectDetails;
  /** Update project information */
  update: ProjectDetails;
};


/** Project-specific mutations */
export type ProjectsMutationAdd_UserArgs = {
  uuid: Scalars['UUID']['input'];
};


/** Project-specific mutations */
export type ProjectsMutationCreateArgs = {
  name: Scalars['String']['input'];
};


/** Project-specific mutations */
export type ProjectsMutationRemove_UserArgs = {
  uuid: Scalars['UUID']['input'];
};


/** Project-specific mutations */
export type ProjectsMutationUpdateArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  uuid: Scalars['UUID']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** Detailed card information */
  card_details?: Maybe<CardDetails>;
  /** Detailed project information */
  project?: Maybe<ProjectDetails>;
  /** Basic projects information */
  projects: Array<Project>;
  /** User information */
  user?: Maybe<User>;
};


export type QueryCard_DetailsArgs = {
  cardUuid: Scalars['UUID']['input'];
};


export type QueryProjectArgs = {
  projectUuid: Scalars['UUID']['input'];
};


export type QueryUserArgs = {
  userUuid: Scalars['UUID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Card created */
  card_created: Card;
  /** Card updated */
  card_updated: Card;
  /** Column created */
  column_created: Column;
  /** Column updated */
  column_updated: Column;
  /** Project created */
  project_created: Project;
  /** Project updated */
  project_updated: Project;
};

/** Represents a tag */
export type Tag = {
  __typename?: 'Tag';
  /** Tag color */
  color?: Maybe<Scalars['HexColorCode']['output']>;
  /** Tag UUID */
  uuid: Scalars['UUID']['output'];
  /** Tag value */
  value: Scalars['String']['output'];
};

/** Represents a user */
export type User = IUser & {
  __typename?: 'User';
  /** Email address */
  email?: Maybe<Scalars['EmailAddress']['output']>;
  /** Profile picture url */
  image?: Maybe<Scalars['URL']['output']>;
  /** Display name */
  name?: Maybe<Scalars['String']['output']>;
  /** User UUID */
  uuid?: Maybe<Scalars['UUID']['output']>;
};

/** User-specific mutations */
export type UsersMutation = {
  __typename?: 'UsersMutation';
  /** Update user information */
  update: User;
};


/** User-specific mutations */
export type UsersMutationUpdateArgs = {
  email?: InputMaybe<Scalars['EmailAddress']['input']>;
  image?: InputMaybe<Scalars['URL']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  uuid: Scalars['UUID']['input'];
};

export type CardDetailsQueryVariables = Exact<{
  cardUuid: Scalars['UUID']['input'];
}>;


export type CardDetailsQuery = { __typename?: 'Query', card_details?: { __typename?: 'CardDetails', description?: string | null, name?: string | null, deadline?: string | null, assignees: Array<{ __typename?: 'User', name?: string | null, uuid?: string | null }>, column?: { __typename?: 'Column', name?: string | null } | null, milestone?: { __typename?: 'Milestone', name?: string | null } | null, tags: Array<{ __typename?: 'Tag', color?: any | null, value: string, uuid: string }> } | null };

export type ProjectQueryVariables = Exact<{
  projectUuid: Scalars['UUID']['input'];
}>;


export type ProjectQuery = { __typename?: 'Query', project?: { __typename?: 'ProjectDetails', uuid: string, name: string, created: string, columns: Array<{ __typename?: 'Column', uuid: string, name?: string | null, order: number, type?: ColumnType | null, description?: string | null, cards: Array<{ __typename?: 'Card', uuid: string, name?: string | null, order: number, deadline?: string | null, assignees: Array<{ __typename?: 'User', uuid?: string | null, image?: any | null }>, tags: Array<{ __typename?: 'Tag', uuid: string, value: string, color?: any | null }> }> }>, milestones: Array<{ __typename?: 'Milestone', uuid: string, name?: string | null }>, users: Array<{ __typename?: 'ProjectUser', uuid?: string | null, name?: string | null }>, tags: Array<{ __typename?: 'Tag', uuid: string, value: string, color?: any | null }> } | null };


export const CardDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CardDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cardUuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card_details"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cardUuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cardUuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"column"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"milestone"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deadline"}}]}}]}}]} as unknown as DocumentNode<CardDetailsQuery, CardDetailsQueryVariables>;
export const ProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Project"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectUuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectUuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectUuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"assignees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deadline"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"milestones"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]}}]} as unknown as DocumentNode<ProjectQuery, ProjectQueryVariables>;