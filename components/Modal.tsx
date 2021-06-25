import ReactModal from "react-modal"

ReactModal.defaultStyles.overlay.backgroundColor = "#0000004d"

interface Props extends ReactModal.Props {
  children: React.ReactNode
}

export default function Modal({ children, ...props }: Props) {
  if (typeof window !== "undefined") {
    ReactModal.setAppElement("body")
  }

  return <ReactModal {...props}>{children}</ReactModal>
}
