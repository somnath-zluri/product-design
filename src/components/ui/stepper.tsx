import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepperStep {
  label: string;
  description?: string;
}

interface VerticalStepperProps {
  steps: StepperStep[];
  currentStep: number;
  className?: string;
}

export function VerticalStepper({ steps, currentStep, className }: VerticalStepperProps) {
  return (
    <div className={cn('flex flex-col w-fit', className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const stepNumber = index + 1;

        return (
          <div key={index} className="flex items-start space-x-4">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-full border-2 text-sm font-medium',
                  isCompleted
                    ? 'border-primary bg-primary text-primary-foreground'
                    : isCurrent
                      ? 'border-primary bg-background text-primary'
                      : 'border-muted bg-background text-muted-foreground'
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span>{stepNumber}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'w-0.5',
                    isCompleted ? 'bg-primary' : 'bg-muted'
                  )}
                  style={{ height: '24px' }}
                />
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1 pt-1">
              <div
                className={cn(
                  'text-sm font-medium',
                  isCurrent ? 'text-foreground' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {step.label}
              </div>
              {step.description && (
                <div className="mt-1 text-xs text-muted-foreground">{step.description}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface HorizontalStepperProps {
  steps: StepperStep[];
  currentStep: number;
  className?: string;
}

export function HorizontalStepper({ steps, currentStep, className }: HorizontalStepperProps) {
  return (
    <div className={cn('flex items-center w-fit gap-2', className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const stepNumber = index + 1;

        return (
          <React.Fragment key={index}>
            <div className="flex items-center space-x-2">
              {/* Step Circle */}
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium',
                  isCompleted
                    ? 'border-primary bg-primary text-primary-foreground'
                    : isCurrent
                      ? 'border-primary bg-background text-primary'
                      : 'border-muted bg-background text-muted-foreground'
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span>{stepNumber}</span>
                )}
              </div>

              {/* Step Label */}
              <span
                className={cn(
                  'text-sm font-medium',
                  isCurrent ? 'text-foreground' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'h-0.5 flex-1 min-w-[32px]',
                  isCompleted ? 'bg-primary' : 'bg-muted'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

