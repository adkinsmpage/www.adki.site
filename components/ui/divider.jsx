import clsx from 'clsx'

export const Divider = ({ className }) => {
    return (
        <span
            className={clsx('select-none whitespace-pre opacity-50', className)}
        >
            {' '}
            |{' '}
        </span>
    )
}