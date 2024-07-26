<script>
	let firstName = '';
	let surname = '';
	let email = '';
	let password = '';
	let day = '';
	let month = '';
	let year = '';
	let gender = '';

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('First Name:', firstName);
		console.log('Surname:', surname);
		console.log('Email:', email);
		console.log('Password:', password);
		console.log('Date of Birth:', `${day}-${month}-${year}`);
		console.log('Gender:', gender);
	};
</script>

<div class="maindiv">
	<div class="signup-container">
		<div class="signup-header">
			<h2>Sign Up</h2>
			<button class="close-btn">×</button>
		</div>
		<form class="signup-form" on:submit={handleSubmit}>
			<div class="name-input-group">
				<input
					type="text"
					id="first-name"
					placeholder="First Name"
					bind:value={firstName}
					required
				/>
				<input type="text" id="surname" placeholder="Surname" bind:value={surname} required />
			</div>

			<div class="input-group">
				<input
					type="text"
					id="email"
					placeholder="Mobile number or email address"
					bind:value={email}
					required
				/>
				<span class="error">Enter Mobile number or email address</span>
			</div>

			<div class="input-group">
				<input
					type="password"
					id="password"
					placeholder="Password"
					bind:value={password}
					required
				/>
				<span class="note">Password must be at least 4 chars long</span>
			</div>

			<div class="input-group">
				<label for="dob">Date of Birth</label>
				<div class="dob">
					<select id="day" bind:value={day} required>
						<option value="">Day</option>
						<!-- Add day options -->
						{#each Array.from({ length: 31 }, (_, i) => i + 1) as d}
							<option value={d}>{d}</option>
						{/each}
					</select>
					<select id="month" bind:value={month} required>
						<option value="">Month</option>
						<!-- Add month options -->
						<option value="Jan">Jan</option>
						<option value="Feb">Feb</option>
						<option value="Mar">Mar</option>
						<option value="Apr">Apr</option>
						<option value="May">May</option>
						<option value="Jun">Jun</option>
						<option value="Jul">Jul</option>
						<option value="Aug">Aug</option>
						<option value="Sep">Sep</option>
						<option value="Oct">Oct</option>
						<option value="Nov">Nov</option>
						<option value="Dec">Dec</option>
					</select>
					<select id="year" bind:value={year} required>
						<option value="">Year</option>
						<!-- Add year options -->
						{#each Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i) as y}
							<option value={y}>{y}</option>
						{/each}
					</select>
				</div>
				<span class="error">Invalid Date, please select a valid date</span>
			</div>
			<div class="input-group">
				<label for="gender">Please choose a gender. You can change who can see this latter.</label>
				<div class="gender-options">
					<div class="genter-radio-btn">
						<p class="">Female</p>
						<input type="radio" name="gender" value="female" bind:group={gender} required />
					</div>
					<div class="genter-radio-btn">
						<p class="">Male</p>
						<input type="radio" name="gender" value="male" bind:group={gender} required />
					</div>
					<div class="genter-radio-btn">
						<p class="">Custom</p>
						<input type="radio" name="gender" value="custom" bind:group={gender} required />
					</div>
				</div>
			</div>
			<p class="terms">
				By clicking Sign Up, you agree to our User Agreement, Privacy Policy, and Cookie Policy.
			</p>
			<div class="form-actions">
				<button type="submit" class="signup-btn">Sign Up</button>
				<button type="button" class="cancel-btn">Cancel</button>
			</div>
		</form>
	</div>
</div>

<style>
	.maindiv {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.signup-container {
		background-color: #fff;
		border-radius: 8px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		width: 800px;
		padding: 20px;
		box-sizing: border-box;
	}

	.signup-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 0;
		margin-bottom: 20px;
		border-bottom: 1px solid rgb(90, 90, 90);
	}

	.signup-header h2 {
		margin: 0;
	}

	.close-btn {
		background: none;
		border: none;
		font-size: 24px;
		cursor: pointer;
	}

	.name-input-group {
		display: flex;
		gap: 20px;
	}

	.signup-form .input-group input,
	.signup-form .name-input-group input,
	.signup-form .input-group select {
		width: 100%;
		padding: 10px;
		box-sizing: border-box;
		border: 1px solid #ccc;
		border-radius: 4px;
		margin-bottom: 20px;
	}

	.signup-form .input-group .error {
		color: red;
		font-size: 14px;
		display: none;
	}

	.signup-form .input-group .note {
		font-size: 14px;
		color: red;
	}

	.signup-form .input-group .dob {
		display: flex;
		gap: 10px;
	}

	.signup-form .gender-options {
		display: flex;
		gap: 10px;
		padding: 5px 0px 10px 0px;
	}

	.signup-form .gender-options .genter-radio-btn {
		width: 300px;
		display: inline-flex;
		justify-content: space-between;
		align-items: center;
		gap: 20px;
		padding: 10px;
		border: 1px solid gray;
		border-radius: 3px;
	}

	.gender-options .genter-radio-btn input[type='radio'] {
		margin-bottom: 0px;
	}

	.signup-form .terms {
		font-size: 14px;
		color: #000000;
		margin-bottom: 20px;
		padding-top: 10px;
		text-align: center;
	}

	.signup-form .form-actions {
		display: flex;
		justify-content: center;
		gap: 20px;
	}

	.signup-form .form-actions .signup-btn,
	.signup-form .form-actions .cancel-btn {
		padding: 10px 20px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.signup-form .form-actions .signup-btn {
		background-color: #1877f2;
		color: #fff;
	}

	.signup-form .form-actions .cancel-btn {
		background-color: #ccc;
	}
</style>
