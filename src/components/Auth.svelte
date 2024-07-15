
<div class="signup-container">
	<div class="signup-header">
		<h2>Sign Up</h2>
		<button class="close-btn">×</button>
	</div>
	<form class="signup-form">
		<div class="input-group">
			<label for="first-name">First Name</label>
			<input type="text" id="first-name" name="first-name" required />
		</div>
		<div class="input-group">
			<label for="surname">Surname</label>
			<input type="text" id="surname" name="surname" required />
		</div>
		<div class="input-group">
			<label for="email">Mobile number or email address</label>
			<input type="text" id="email" name="email" required />
			<span class="error">Enter Mobile number or email address</span>
		</div>
		<div class="input-group">
			<label for="password">Password</label>
			<input type="password" id="password" name="password" required />
			<span class="note">Password must be at least 4 chars long</span>
		</div>
		<div class="input-group">
			<label for="dob">Date of Birth</label>
			<div class="dob">
				<select id="day" name="day" required>
					<!-- Day options -->
				</select>
				<select id="month" name="month" required>
					<!-- Month options -->
				</select>
				<select id="year" name="year" required>
					<!-- Year options -->
				</select>
			</div>
			<span class="error">Invalid Date, please select a valid date</span>
		</div>
		<div class="input-group">
			<label for="gender">Please choose a gender</label>
			<div class="gender-options">
				<label>
					<input type="radio" name="gender" value="female" required />
					Female
				</label>
				<label>
					<input type="radio" name="gender" value="male" required />
					Male
				</label>
				<label>
					<input type="radio" name="gender" value="custom" required />
					Custom
				</label>
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
