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
  /** Delete card */
  delete?: Maybe<Scalars['UUID']['output']>;
  /** Move card to another position and shift all cards in between */
  move?: Maybe<Scalars['Void']['output']>;
  /** Move card to empty column */
  move_to_column?: Maybe<Scalars['Void']['output']>;
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
export type CardsMutationDeleteArgs = {
  uuid: Scalars['UUID']['input'];
};


/** Card-specific mutations */
export type CardsMutationMoveArgs = {
  uuid_from: Scalars['UUID']['input'];
  uuid_to: Scalars['UUID']['input'];
};


/** Card-specific mutations */
export type CardsMutationMove_To_ColumnArgs = {
  card_uuid: Scalars['UUID']['input'];
  column_uuid: Scalars['UUID']['input'];
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
  /** Deletes a column */
  delete: Scalars['UUID']['output'];
  /** Move column to another position and shift all columns in between */
  move?: Maybe<Scalars['Void']['output']>;
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
export type ColumnMutationDeleteArgs = {
  uuid: Scalars['UUID']['input'];
};


/** Column-specific mutations */
export type ColumnMutationMoveArgs = {
  uuid_from: Scalars['UUID']['input'];
  uuid_to: Scalars['UUID']['input'];
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
  /** Milestone information */
  milestone?: Maybe<Milestone>;
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


export type QueryMilestoneArgs = {
  milestoneUuid: Scalars['UUID']['input'];
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
  /** Card deleted */
  card_deleted: Scalars['UUID']['output'];
  /** Card updated */
  card_updated: Card;
  /** Column created */
  column_created: Column;
  /** Column got deleted */
  column_deleted: Scalars['UUID']['output'];
  /** Column updated */
  column_updated: Column;
  /** Milestone updated */
  milestone_updated: Milestone;
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

export type CardCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CardCreatedSubscription = { __typename?: 'Subscription', card_created: { __typename?: 'Card', uuid: string, order: number, column?: { __typename?: 'Column', uuid: string } | null } };

export type CardDeletedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CardDeletedSubscription = { __typename?: 'Subscription', card_deleted: string };

export type CardDetailsQueryVariables = Exact<{
  cardUuid: Scalars['UUID']['input'];
}>;


export type CardDetailsQuery = { __typename?: 'Query', card_details?: { __typename?: 'CardDetails', description?: string | null, name?: string | null, deadline?: string | null, assignees: Array<{ __typename?: 'User', name?: string | null, uuid?: string | null }>, column?: { __typename?: 'Column', name?: string | null } | null, milestone?: { __typename?: 'Milestone', name?: string | null } | null, tags: Array<{ __typename?: 'Tag', color?: any | null, value: string, uuid: string }> } | null };

export type CardUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CardUpdatedSubscription = { __typename?: 'Subscription', card_updated: { __typename?: 'Card', name?: string | null, deadline?: string | null, uuid: string } };

export type ColumnCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ColumnCreatedSubscription = { __typename?: 'Subscription', column_created: { __typename?: 'Column', uuid: string, name?: string | null, description?: string | null, type?: ColumnType | null, order: number, cards: Array<{ __typename?: 'Card', uuid: string, name?: string | null, order: number, deadline?: string | null, assignees: Array<{ __typename?: 'User', uuid?: string | null, image?: any | null }>, tags: Array<{ __typename?: 'Tag', uuid: string, value: string, color?: any | null }> }> } };

export type ColumnDeletedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ColumnDeletedSubscription = { __typename?: 'Subscription', column_deleted: string };

export type CreateColumnMutationVariables = Exact<{
  project_uuid: Scalars['UUID']['input'];
}>;


export type CreateColumnMutation = { __typename?: 'Mutation', columns: { __typename?: 'ColumnMutation', create: { __typename?: 'Column', uuid: string, name?: string | null, type?: ColumnType | null, order: number, description?: string | null } } };

export type DeleteColumnMutationVariables = Exact<{
  uuid: Scalars['UUID']['input'];
}>;


export type DeleteColumnMutation = { __typename?: 'Mutation', columns: { __typename?: 'ColumnMutation', delete: string } };

export type MoveColumnMutationVariables = Exact<{
  uuidFrom: Scalars['UUID']['input'];
  uuidTo: Scalars['UUID']['input'];
}>;


export type MoveColumnMutation = { __typename?: 'Mutation', columns: { __typename?: 'ColumnMutation', move?: any | null } };

export type CreateCardMutationVariables = Exact<{
  columnUuid: Scalars['UUID']['input'];
}>;


export type CreateCardMutation = { __typename?: 'Mutation', cards: { __typename?: 'CardsMutation', create: { __typename?: 'Card', uuid: string } } };

export type DeleteCardMutationVariables = Exact<{
  cardUuid: Scalars['UUID']['input'];
}>;


export type DeleteCardMutation = { __typename?: 'Mutation', cards: { __typename?: 'CardsMutation', delete?: string | null } };

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', uuid: string, name: string }> };

export type MilestoneQueryVariables = Exact<{
  milestoneUuid: Scalars['UUID']['input'];
}>;


export type MilestoneQuery = { __typename?: 'Query', milestone?: { __typename?: 'Milestone', uuid: string, name?: string | null, deadline?: string | null, creation_timestamp: string, cards: Array<{ __typename?: 'Card', name?: string | null, order: number, deadline?: string | null, created: string, uuid: string, column?: { __typename?: 'Column', uuid: string, type?: ColumnType | null } | null, assignees: Array<{ __typename?: 'User', name?: string | null, uuid?: string | null, image?: any | null }>, tags: Array<{ __typename?: 'Tag', uuid: string, value: string, color?: any | null }> }> } | null };

export type MilestoneUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MilestoneUpdatedSubscription = { __typename?: 'Subscription', milestone_updated: { __typename?: 'Milestone', uuid: string, name?: string | null, deadline?: string | null, creation_timestamp: string } };

export type MoveCardMutationVariables = Exact<{
  uuidFrom: Scalars['UUID']['input'];
  uuidTo: Scalars['UUID']['input'];
}>;


export type MoveCardMutation = { __typename?: 'Mutation', cards: { __typename?: 'CardsMutation', move?: any | null } };

export type MoveCardToColumnMutationVariables = Exact<{
  cardUuid: Scalars['UUID']['input'];
  columnUuid: Scalars['UUID']['input'];
}>;


export type MoveCardToColumnMutation = { __typename?: 'Mutation', cards: { __typename?: 'CardsMutation', move_to_column?: any | null } };

export type ProjectQueryVariables = Exact<{
  projectUuid: Scalars['UUID']['input'];
}>;


export type ProjectQuery = { __typename?: 'Query', project?: { __typename?: 'ProjectDetails', uuid: string, name: string, created: string, columns: Array<{ __typename?: 'Column', uuid: string, name?: string | null, order: number, type?: ColumnType | null, description?: string | null, cards: Array<{ __typename?: 'Card', uuid: string, name?: string | null, order: number, deadline?: string | null, assignees: Array<{ __typename?: 'User', uuid?: string | null, image?: any | null }>, tags: Array<{ __typename?: 'Tag', uuid: string, value: string, color?: any | null }> }> }>, milestones: Array<{ __typename?: 'Milestone', uuid: string, name?: string | null }>, users: Array<{ __typename?: 'ProjectUser', uuid?: string | null, name?: string | null }>, tags: Array<{ __typename?: 'Tag', uuid: string, value: string, color?: any | null }> } | null };

export type UpdateCardAssigneesMutationVariables = Exact<{
  uuid: Scalars['UUID']['input'];
  assigneeUuids?: InputMaybe<Array<Scalars['UUID']['input']> | Scalars['UUID']['input']>;
}>;


export type UpdateCardAssigneesMutation = { __typename?: 'Mutation', cards: { __typename?: 'CardsMutation', update_details: { __typename?: 'Card', assignees: Array<{ __typename?: 'User', uuid?: string | null, name?: string | null }> } } };

export type UpdateCardDeadlineMutationVariables = Exact<{
  uuid: Scalars['UUID']['input'];
  deadline?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type UpdateCardDeadlineMutation = { __typename?: 'Mutation', cards: { __typename?: 'CardsMutation', update_details: { __typename?: 'Card', deadline?: string | null } } };

export type UpdateCardDescriptionMutationVariables = Exact<{
  uuid: Scalars['UUID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCardDescriptionMutation = { __typename?: 'Mutation', cards: { __typename?: 'CardsMutation', update_details: { __typename?: 'Card', description?: string | null } } };

export type UpdateCardMilestoneMutationVariables = Exact<{
  uuid: Scalars['UUID']['input'];
  milestoneUuid?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type UpdateCardMilestoneMutation = { __typename?: 'Mutation', cards: { __typename?: 'CardsMutation', update_details: { __typename?: 'Card', milestone?: { __typename?: 'Milestone', uuid: string } | null } } };

export type UpdateCardNameMutationVariables = Exact<{
  uuid: Scalars['UUID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCardNameMutation = { __typename?: 'Mutation', cards: { __typename?: 'CardsMutation', update_details: { __typename?: 'Card', name?: string | null } } };

export type UpdateCardTagsMutationVariables = Exact<{
  uuid: Scalars['UUID']['input'];
  tagUuids?: InputMaybe<Array<Scalars['UUID']['input']> | Scalars['UUID']['input']>;
}>;


export type UpdateCardTagsMutation = { __typename?: 'Mutation', cards: { __typename?: 'CardsMutation', update_details: { __typename?: 'Card', tags: Array<{ __typename?: 'Tag', uuid: string }> } } };

export type UpdateMilestoneDeadlineMutationVariables = Exact<{
  uuid: Scalars['UUID']['input'];
  deadline?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type UpdateMilestoneDeadlineMutation = { __typename?: 'Mutation', milestones: { __typename?: 'MilestoneMutation', update?: { __typename?: 'Milestone', deadline?: string | null } | null } };

export type UpdateMilestoneNameMutationVariables = Exact<{
  uuid: Scalars['UUID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateMilestoneNameMutation = { __typename?: 'Mutation', milestones: { __typename?: 'MilestoneMutation', update?: { __typename?: 'Milestone', name?: string | null } | null } };


export const CardCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"CardCreated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card_created"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"column"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]} as unknown as DocumentNode<CardCreatedSubscription, CardCreatedSubscriptionVariables>;
export const CardDeletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"CardDeleted"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card_deleted"}}]}}]} as unknown as DocumentNode<CardDeletedSubscription, CardDeletedSubscriptionVariables>;
export const CardDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CardDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cardUuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card_details"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cardUuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cardUuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"column"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"milestone"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deadline"}}]}}]}}]} as unknown as DocumentNode<CardDetailsQuery, CardDetailsQueryVariables>;
export const CardUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"CardUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card_updated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"deadline"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}}]}}]} as unknown as DocumentNode<CardUpdatedSubscription, CardUpdatedSubscriptionVariables>;
export const ColumnCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ColumnCreated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"column_created"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"assignees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deadline"}}]}}]}}]}}]} as unknown as DocumentNode<ColumnCreatedSubscription, ColumnCreatedSubscriptionVariables>;
export const ColumnDeletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ColumnDeleted"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"column_deleted"}}]}}]} as unknown as DocumentNode<ColumnDeletedSubscription, ColumnDeletedSubscriptionVariables>;
export const CreateColumnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateColumn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"project_uuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"project_uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"project_uuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<CreateColumnMutation, CreateColumnMutationVariables>;
export const DeleteColumnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteColumn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}}]}]}}]}}]} as unknown as DocumentNode<DeleteColumnMutation, DeleteColumnMutationVariables>;
export const MoveColumnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MoveColumn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuidFrom"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuidTo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"move"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid_from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuidFrom"}}},{"kind":"Argument","name":{"kind":"Name","value":"uuid_to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuidTo"}}}]}]}}]}}]} as unknown as DocumentNode<MoveColumnMutation, MoveColumnMutationVariables>;
export const CreateCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"columnUuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"column_uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"columnUuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}}]}}]}}]} as unknown as DocumentNode<CreateCardMutation, CreateCardMutationVariables>;
export const DeleteCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cardUuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cardUuid"}}}]}]}}]}}]} as unknown as DocumentNode<DeleteCardMutation, DeleteCardMutationVariables>;
export const GetProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetProjectsQuery, GetProjectsQueryVariables>;
export const MilestoneDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Milestone"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"milestoneUuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"milestone"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"milestoneUuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"milestoneUuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"deadline"}},{"kind":"Field","name":{"kind":"Name","value":"creation_timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"deadline"}},{"kind":"Field","name":{"kind":"Name","value":"column"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"assignees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}}]}}]}}]} as unknown as DocumentNode<MilestoneQuery, MilestoneQueryVariables>;
export const MilestoneUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MilestoneUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"milestone_updated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"deadline"}},{"kind":"Field","name":{"kind":"Name","value":"creation_timestamp"}}]}}]}}]} as unknown as DocumentNode<MilestoneUpdatedSubscription, MilestoneUpdatedSubscriptionVariables>;
export const MoveCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MoveCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuidFrom"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuidTo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"move"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid_from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuidFrom"}}},{"kind":"Argument","name":{"kind":"Name","value":"uuid_to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuidTo"}}}]}]}}]}}]} as unknown as DocumentNode<MoveCardMutation, MoveCardMutationVariables>;
export const MoveCardToColumnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MoveCardToColumn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cardUuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"columnUuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"move_to_column"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"card_uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cardUuid"}}},{"kind":"Argument","name":{"kind":"Name","value":"column_uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"columnUuid"}}}]}]}}]}}]} as unknown as DocumentNode<MoveCardToColumnMutation, MoveCardToColumnMutationVariables>;
export const ProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Project"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectUuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectUuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectUuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"assignees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deadline"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"milestones"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]}}]} as unknown as DocumentNode<ProjectQuery, ProjectQueryVariables>;
export const UpdateCardAssigneesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCardAssignees"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assigneeUuids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_details"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}},{"kind":"Argument","name":{"kind":"Name","value":"assignee_uuids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assigneeUuids"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCardAssigneesMutation, UpdateCardAssigneesMutationVariables>;
export const UpdateCardDeadlineDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCardDeadline"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deadline"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_details"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}},{"kind":"Argument","name":{"kind":"Name","value":"deadline"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deadline"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deadline"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCardDeadlineMutation, UpdateCardDeadlineMutationVariables>;
export const UpdateCardDescriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCardDescription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_details"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCardDescriptionMutation, UpdateCardDescriptionMutationVariables>;
export const UpdateCardMilestoneDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCardMilestone"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"milestoneUuid"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_details"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}},{"kind":"Argument","name":{"kind":"Name","value":"milestone_uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"milestoneUuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"milestone"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCardMilestoneMutation, UpdateCardMilestoneMutationVariables>;
export const UpdateCardNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCardName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_details"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCardNameMutation, UpdateCardNameMutationVariables>;
export const UpdateCardTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCardTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tagUuids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_details"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}},{"kind":"Argument","name":{"kind":"Name","value":"tag_uuids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tagUuids"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCardTagsMutation, UpdateCardTagsMutationVariables>;
export const UpdateMilestoneDeadlineDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMilestoneDeadline"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deadline"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"milestones"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}},{"kind":"Argument","name":{"kind":"Name","value":"deadline"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deadline"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deadline"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateMilestoneDeadlineMutation, UpdateMilestoneDeadlineMutationVariables>;
export const UpdateMilestoneNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMilestoneName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"milestones"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateMilestoneNameMutation, UpdateMilestoneNameMutationVariables>;