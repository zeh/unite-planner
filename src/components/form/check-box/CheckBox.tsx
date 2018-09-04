import * as cx from 'classnames';
import * as React from 'react';

import * as styles from './CheckBox.css';

interface IProps {
	className?: string;
	value?: boolean;
	onChange?: (value: boolean) => void;
	children?: React.ReactNode;
}

export default class CheckBox extends React.Component<IProps> {
	constructor(props: IProps) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onClickLabel = this.onClickLabel.bind(this);
	}

	public render() {
		const {
			className,
			value,
			children,
		} = this.props;

		return (
			<div className={ cx(className, styles.main) }>
				<input
					className={ styles.checkbox }
					checked={ value }
					type={ 'checkbox' }
					onChange={ this.onChange }
				/>
				<div className={ styles.label } onClick={ this.onClickLabel }>
					{ children }
				</div>
			</div>
		);
	}

	private onChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (this.props.onChange) {
			const target = e.nativeEvent.target;
			if (target) {
				const newValue = (target as any).checked;
				this.props.onChange(newValue);
			}
		}
	}

	private onClickLabel() {
		if (this.props.onChange) {
			const newValue = !this.props.value;
			this.props.onChange(newValue);
		}
	}
}
