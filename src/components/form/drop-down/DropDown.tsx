import * as cx from 'classnames';
import * as React from 'react';

import * as styles from './DropDown.css';

interface IProps {
	className?: string;
	value?: string | number;
	options?: Array<[ string | number, string ]>;
	onChange?: (key: string) => void;
}

export default class DropDown extends React.Component<IProps> {
	constructor(props: IProps) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	public render() {
		const {
			className,
			value,
			options,
		} = this.props;

		return (
			<select
				className={ cx(className, styles.main) }
				value={ value }
				onChange={ this.onChange }
			>
				{ options && options.map((option) => {
					const key = typeof option[0] === 'number' ? option[0].toString() : option[0];
					return (
						<option key={ key } value={ key }>
							{ option[1] }
						</option>
					);
				}) }
			</select>
		);
	}

	private onChange(e: React.ChangeEvent<HTMLSelectElement>) {
		if (this.props.onChange) {
			const target = e.nativeEvent.target;
			if (target) {
				const newValue = (target as any).value;
				this.props.onChange(newValue);
			}
		}
	}
}
