import { type FC } from "react";
import styles from "./style/Style.module.css";
import SkillCardComponent from "../card/SkillCardComponent";
import type { Skill } from "@/domain/entities/skill/Skill";

interface SkillListComponentProps {
    skills: Skill[];
}

const SkillListComponent: FC<SkillListComponentProps> = ({ skills }) => {
    return (
        <div className={styles.skillListContainer}>
            {skills.map((skill) => (
                <SkillCardComponent key={skill.id} skill={skill} />
            ))}
        </div>
    );
};

export default SkillListComponent
