export enum SOFPOSITION {
  LEFT = "left",
  RIGHT = "right",
}

interface SOFCardProps {
  className?: string
  id: number;
  title: string;
  children: React.ReactNode;
  position: SOFPOSITION
}
import "./styles/SOFCard.css"

export default function SOFCard({className, id, title, children, position}: SOFCardProps) {
  return (
    <div className={className}>
      <div className={'sof-card-container' + (position === "left" ? " sof-left" : " sof-right")}>
        <div className={"sof-card-id" + (position === "left" ? " sof-id-left" : " sof-id-right")}>
          {id}
        </div>
        <div className={'sof-card-text'}>
        <span className={'sof-card-title'}>
        {title}
      </span>
          <span className={'sof-card-description'}>
        {children}
      </span>
        </div>
      </div>
    </div>
  )
}