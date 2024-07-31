import React, { FC } from 'react';
import { CompletedTasksWrapper } from './CompletedTasks.styled';

interface CompletedTasksProps {}

const CompletedTasks: FC<CompletedTasksProps> = () => (
 <CompletedTasksWrapper>
    CompletedTasks Component
 </CompletedTasksWrapper>
);

export default CompletedTasks;
