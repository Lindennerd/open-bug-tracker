import React from "react";

type FormProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export const Form = (props: FormProps) => {
  return <form {...props}></form>;
};
