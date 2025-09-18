export const Join = {
  and: 'and',
  or: 'or',
} as const;

export type Join = (typeof Join)[keyof typeof Join];
export const JoinValues = Object.entries(Join).map(([key, v]) => ({
  key,
  display: v,
}));

export const FilterOperator = {
  equal_to: 'Equal to',
  not_equal_to: 'Not equal to',

  is_any_of: 'Is any of',
  is_all_of: 'Is all of',
  is_none_of: 'Is none of',

  more_than: 'More than',
  more_than_or_equal_to: 'More than or equal to',
  less_then: 'Less_than',
  less_then_or_equal_to: 'Less than or equal to',
} as const;

export const FilterOperatorValues = Object.entries(FilterOperator).map(
  ([key, v]) => ({ key, display: v }),
);

export const Parameters = {
  WebmasterStatus: 'Webmaster status',
  WebmasterGeo: 'Webmaster geo',
  WebmasterLanguage: 'Webmaster language',
} as const;

export const ParametersValues = Object.entries(Parameters).map(([key, v]) => ({
  key,
  display: v,
}));

export interface Condition {
  parameter: string;
  operator: keyof typeof FilterOperator;
  value: string;
  joinOp?: Join;
}

export interface Segment {
  id?: string;
  title: string;
  description: string;
  conditions: Condition[];
  isDescriptionRequired: boolean;
}
