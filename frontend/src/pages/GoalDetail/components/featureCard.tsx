import { Card } from "@root/components/ui/index.js";

interface featureCardProps {
    title: string;
    content: string | undefined;
}

export const FeatureCard = ({title, content}: featureCardProps ) => {
    return (
        <Card className="goal-feature-card">
            <h3 className="title">{title}</h3>
            <p className="content break-words">{content}</p>
        </Card>
    );
}

export default FeatureCard;